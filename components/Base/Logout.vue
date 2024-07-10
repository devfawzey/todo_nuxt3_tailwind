<script setup lang="ts">
import {
    Github,
    LogOut,
    ChevronDown
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="bg-transparent ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-gray-800 dark:hover:bg-gray-800">
                <Github class="mr-2 h-4 w-4" />
                <!-- <img :src="photoURL" class="mr-2 w-5 h-5 rounded-full" /> -->
                devfawzey
                <!-- {{ displayName }} -->
                <ChevronDown class="ms-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="DropdownMenuContent dark:bg-gray-800">
            <DropdownMenuItem class="cursor-pointer dark:focus:bg-gray-900">
                <LogOut class="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style>
.DropdownMenuContent {
    width: var(--radix-dropdown-menu-trigger-width);
}
</style>