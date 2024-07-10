<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
defineProps({
    completed: {
        type: Boolean
    }
})
defineEmits(["controlTodo"])
</script>

<template>
    <div class="flex items-center space-x-2">
        <Switch @update:checked="$emit('controlTodo', $event)" :checked="completed" id="airplane-mode"
            class="dark:bg-primary-400 bg-primary-500 disabled:opacity-50 dark:[&>span]:bg-gray-900 dark:data-[state=unchecked]:bg-gray-700
            data-[state=unchecked]:bg-gray-300" />
    </div>
</template>