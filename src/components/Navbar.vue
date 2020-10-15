<template>
    <v-navigation-drawer
    v-model="this.$store.state.drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    >
    <v-list dense>
        <template v-for="item in items">
        <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
        >
            <v-col cols="6">
            <v-subheader v-if="item.heading">
                {{ item.heading }}
            </v-subheader>
            </v-col>
            <v-col
            cols="6"
            class="text-center"
            >
            <a
                href="#!"
                class="body-2 black--text"
            >EDIT</a>
            </v-col>
        </v-row>
        <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
        >
            <template v-slot:activator>
            <v-list-item-content>
                <v-list-item-title>
                {{ item.text }}
                </v-list-item-title>
            </v-list-item-content>
            </template>
            <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            >
            <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                {{ child.text }}
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-group>
        <v-list-item
            v-else
            :key="item.text"
            link
        >
            <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
            <v-list-item-title>
                {{ item.text }}
            </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </template>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mdiFolderOutline } from '@mdi/js'

export default {
    data(){
        return {
            drawer: null,
            items: [
            { icon: 'mdi-folder-outline', text: '모든 파일' },
            { icon: 'mdi-timelapse', text: '최근 문서함' },
            { icon: 'mdi-star', text: '즐겨찾기' },
            { icon: 'mdi-folder-open',text: '공유 문서함', },
            { icon: 'mdi-folder-google-drive',text: '최근 ', },
            { icon: 'mdi-folder-lock',text: '중요 문서함', },
            { icon: 'mdi-delete-empty',text: '휴지통', },
            { icon: 'mdi-memory',text: '설정', },
            ],
        }

    }
}
</script>

<style>

</style>