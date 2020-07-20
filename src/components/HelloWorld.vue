<template>
    <div class="main-content flex-column">
        <div class="filter-block flex">
            <el-select v-model="filter.category"
                       @change="updateItems()">
                <el-option v-for="item in filterItems"
                           :value="item.value"
                           :key="item.id"
                           :label="item.name"></el-option>
            </el-select>
            <el-select v-model="filter.sort"
                       @change="updateItems()">
                <el-option v-for="item in sortItems"
                           :value="item.value"
                           :key="item.value"
                           :label="item.name"></el-option>
            </el-select>
        </div>
        <div class="sort-block flex"></div>
        <div class="content-block flex-column"
             @scroll="onScroll($event)"
             id="scrollElement">
            <div v-for="item in cards"
                 :key="item.id"
                 class="block-card flex-column">
                <div><h3>{{item.title}}</h3></div>
                <div class="card-text">{{item.text}}</div>
                <div>Категория: {{item.category}}</div>
                <div>
                    <el-button @click="clickLike(item)">{{!item.liked ? 'Отметить понравившейся' : 'Убрать like'}}
                    </el-button>
                </div>
                <span>{{item.date}}</span>
                <hr style="width: 100%">
            </div>
        </div>
    </div>
</template>

<script>
    import * as ld from 'lodash';
    import { blocksData, categories } from "@/state/state";

    export default {
        name: 'HelloWorld',
        props: {},
        data() {
            return {
                filter: {
                    category: null,
                    sort: 1
                },
                offset: 0,
                items: blocksData.slice(0, 15)
            };
        },
        computed: {
            filterItems() {
                return categories.slice();
            },
            cards() {
                return this.items
                    .filter(e => this.filter.category ? e.category === this.filter.category : true)
                    .sort((a, b) => {
                        const aDate = a.date + '';
                        const bDate = b.date + '';
                        a.date = a.date.split('.');
                        b.date = b.date.split('.');
                        [a.date[0], a.date[1]] = [a.date[1], a.date[0]];
                        [b.date[0], b.date[1]] = [b.date[1], b.date[0]];
                        a.date = a.date.join('.');
                        b.date = b.date.join('.');
                        a.date = new Date(a.date);
                        b.date = new Date(b.date);
                        const date1 = a.date;
                        const date2 = b.date;
                        let res = 0;
                        if (date1 < date2) res = -1;
                        if (date1 > date2) res = 1;
                        if (this.filter.sort === 1) {
                            res *= -1;
                        }
                        a.date = aDate;
                        b.date = bDate;
                        return res;
                    });
            },
            sortItems() {
                return [{ name: 'Сначала новые', value: 1 }, { name: 'Сначала старые', value: 2 }];
            }
        },
        methods: {
            onScroll: ld.debounce(function (event) {
                const target = event.target;
                if (target.clientHeight + target.scrollTop >= 0.7 * target.scrollHeight) {
                    if (this.items.length < blocksData.length) {
                        this.offset += 15;
                        this.items.push(...blocksData.slice(this.offset, this.offset + 15));
                    }
                }
            }, 200),
            updateItems() {
                this.items = blocksData.slice(0, 15);
                this.offset = 0;
                document.getElementById('scrollElement').scrollTo(0, 0);
            },
            clickLike(item) {
                item.liked = !item.liked;
            //    здесь какой-то ajax запрос на сервер (можно использовать axios, например)
            //    не успеваю вбить параметры фильтра и сортировки в адресную строку
            //    могу на словах потом объяснить, там ничего сложного: используем роутер, потом достаем переменные из роутера
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    .flex {
        display: flex;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .content-block {
        max-height: 37rem;
        overflow: auto;
        margin-top: 1rem;

        .block-card {
            align-items: flex-start;
            justify-content: center;
            width: 15rem;
            box-sizing: border-box;
            padding-bottom: 1rem;

            .card-text {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
            }
        }
    }
</style>
