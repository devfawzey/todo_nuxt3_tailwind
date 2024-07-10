<script setup>
import debounce from 'lodash.debounce';
import { Loader2 } from 'lucide-vue-next'

const todos_list = ref([
  { title: "todo1", completed: false },
  { title: "todo2", completed: false },
  { title: "todo3", completed: false },
])
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value == 'dark')
const todoTitle = ref('')
const input = ref(null);
const isLoading = ref(false)
const loadingTime = 750

const addTodo = async () => {
  isLoading.value = true
  if (!todoTitle.value) return;
  await new Promise((res) => {
    setTimeout(() => {
      todos_list.value.unshift({ title: todoTitle.value, completed: false });
      todoTitle.value = ""
      res('')
    }, loadingTime)
  }).then(() => {
    isLoading.value = false
  })
}
const deleteTodo = (TODO) => {
  const DELETED_TARGET = todos_list.value.find((el) => {
    return el === TODO
  })
  //// 1 filter
  // todos_list.value = todos_list.value.filter((el) => el !== DELETED_TARGET)
  // // 2 get_Index of the element
  const INDEX_OF_DELETED_TARGET = todos_list.value.indexOf(DELETED_TARGET)
  // todos_list.value.splice(INDEX_OF_DELETED_TARGET,1)
  // // 3 SLICE //end_not_included
  todos_list.value = todos_list.value.slice(0, INDEX_OF_DELETED_TARGET).concat(todos_list.value.slice(INDEX_OF_DELETED_TARGET + 1))
}
const focusInput = () => {
  if (!input.value) return;
  input.value.focus()
}

onMounted(() => {
  focusInput()
})


</script>

<template>
  <main class="h-screen w-full mx-auto dark:bg-gray-950 bg-gray-50">
    <div class="main-wrapper px-2 flex justify-center flex-col h-full max-w-xl mx-auto">
      <AppHeader />
      <div class="main-content  dark:bg-gray-900  ring-1 ring-gray-200 dark:ring-gray-800 bg-white  rounded-xl py-5">
        <!-- TODO_HEADER -->
        <div class="todo__header pb-5 px-4 sm:px-6 flex items-center justify-between">
          <h2 class="text-md sm:text-lg">Todo List</h2>
          <ClientOnly>
            <BaseLogout />
          </ClientOnly>
        </div>
        <hr class="dark:border-gray-800 border-gray-300" />
        <!-- TODO_CONTENT -->
        <div class="todo__wrapper pt-5 px-4 sm:px-6">

          <div class="todo__content flex items-center gap-5 ">
            <input v-model="todoTitle" ref="input" @keydown.enter="addTodo" placeholder="Make a Nuxt Demo"
              class="bg-transparent border-0 p-2 rounded-lg ring-1 ring-gray-300 dark:ring-gray-700 w-full focus:ring-2 focus:ring-emerald-400 focus:border-0 focus:outline-none" />
            <Button @click="addTodo" :disabled="!todoTitle || isLoading" size="sm"
              class="bg-primary-400 text-white disabled:opacity-80 dark:text-primary-900 text-xl hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500"
              variant="outline">
              <Icon v-if="!isLoading" name="ic:baseline-plus" />
              <Loader2 v-else class="w-4 h-4  animate-spin" />
            </Button>
          </div>
          <!-- TODO_LIST -->
          <div class="todo__list mt-6">
            <!-- <ul class="p-2 space-y-4 max-h-44 overflow-y-auto "> -->
            <TransitionGroup name="list" tag="ul"
              class="p-2 space-y-4 max-h-64 min-h-44 overflow-y-auto overflow-x-hidden">
              <template v-for="(todo, i) in todos_list" :key="i">

                <li class="grid grid-cols-2  items-center  justify-between">
                  <h4 class="text-lg overflow-hidden whitespace-nowrap text-ellipsis"
                    :class="{ 'line-through text-opacity-50 text-gray-800 dark:text-gray-400': todo.completed }">{{
                      todo.title
                    }}</h4>
                  <div class="actions flex items-cener justify-end gap-5">
                    <BaseSwitch @control-todo="todo.completed = !todo.completed" :completed="todo.completed" />
                    <Button :variant="isDark ? 'destructive' : 'default'" :class="{ 'bg-red-100 text-red-500': !isDark }"
                      size="xs" @click="deleteTodo(todo)">

                      <Icon name="teenyicons:x-small-outline" size="25" />
                    </Button>
                    <!-- {{ isDark }} -->
                  </div>
                </li>
                <hr class=" dark:border-gray-800 border-gray-300" v-if="i < todos_list.length - 1" />
              </template>
            </TransitionGroup>

            <!-- </ul> -->
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style>
ul::-webkit-scrollbar {
  width: 6px;
  /* background-color: ; */
  @apply bg-gray-700 w-2;
}

ul::-webkit-scrollbar-thumb {
  @apply bg-gray-950 rounded-lg;

}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>