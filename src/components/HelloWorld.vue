<template>
    <div class="main-content flex-column">
        <div class="filter-block flex">
            <el-select v-model="filter.category">
                <el-option v-for="item in filterItems"
                           :value="item.value"
                           :key="item.id"
                           :label="item.name"></el-option>
            </el-select>
        </div>
        <div class="sort-block flex"></div>
        <div class="content-block flex-column">
            <div v-for="item in cards"
                 :key="item.id"
                 class="block-card flex-column">
                <div><h3>{{item.title}}</h3></div>
                <div class="card-text">{{item.text}}</div>
                <div>Категория: {{item.category}}</div>
                <hr style="width: 100%">
            </div>
        </div>
    </div>
</template>

<script>
    import { blocksData, categories } from "@/state/state";

    export default {
        name: 'HelloWorld',
        props: {},
        data() {
            return {
                filter: {
                    category: null
                },
            };
        },
        computed: {
            filterItems() {
                return categories.slice();
            },
            cards() {
                return blocksData.filter(e => this.filter.category ? e.category === this.filter.category : true);
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
