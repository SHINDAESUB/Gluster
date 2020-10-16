<template>
    <v-card class="mx-auto" :loading="loading > 0">
        <Toolbar
            :path="path"
            :storages="storagesArray"
            :storage="activeStorage"
            :endpoints="endpoints"
            :axios="axiosInstance"
            v-on:storage-changed="storageChanged"
            v-on:path-changed="pathChanged"
            v-on:add-files="addUploadingFiles"
            v-on:folder-created="refreshPending = true"
        ></Toolbar>
        <v-row no-gutters>
            <v-col v-if="tree && $vuetify.breakpoint.smAndUp" sm="auto">
                <Tree
                    :path="path"
                    :storage="activeStorage"
                    :icons="icons"
                    :endpoints="endpoints"
                    :axios="axiosInstance"
                    :refreshPending="refreshPending"
                    v-on:path-changed="pathChanged"
                    v-on:loading="loadingChanged"
                    v-on:refreshed="refreshPending = false"
                />
            </v-col>
            <v-divider v-if="tree" vertical></v-divider>
            <v-col>
                <List
                    :path="path"
                    :storage="activeStorage"
                    :icons="icons"
                    :endpoints="endpoints"
                    :axios="axiosInstance"
                    :refreshPending="refreshPending"
                    v-on:path-changed="pathChanged"
                    v-on:loading="loadingChanged"
                    v-on:refreshed="refreshPending = false"
                    v-on:file-deleted="refreshPending = true"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import axios from "axios";

import Toolbar from "./fileBrowser/Toolbar"
import Tree    from "./fileBrowser/Tree"
import List    from "./fileBrowser/List"

// import endPointService from "../services/endPoint"

// Stroages 목록
const availableStorages = [
    {
        name: "Local",
        code: "local",
        icon: "mdi-folder-multiple-outline"
    },
    /*{
        name: "Dropbox",
        code: "dropbox",
        icon: "mdi-dropbox"
    }*/
];

// File 확장자에 따른 아이콘 표시
const fileIcons = {
    zip: "mdi-folder-zip-outline",
    rar: "mdi-folder-zip-outline",
    htm: "mdi-language-html5",
    html: "mdi-language-html5",
    js: "mdi-nodejs",
    json: "mdi-json",
    md: "mdi-markdown",
    pdf: "mdi-file-pdf",
    png: "mdi-file-image",
    jpg: "mdi-file-image",
    jpeg: "mdi-file-image",
    mp4: "mdi-filmstrip",
    mkv: "mdi-filmstrip",
    avi: "mdi-filmstrip",
    wmv: "mdi-filmstrip",
    mov: "mdi-filmstrip",
    txt: "mdi-file-document-outline",
    xls: "mdi-file-excel",
    other: "mdi-file-outline"
};

// request  -> service 바꾼다.
const endpoints = {
    list: { url: "/storage/{storage}/list?path={path}", method: "get" },
    // list: endPointService.list('\\test'), 
    upload: { url: "/storage/{storage}/upload?path={path}", method: "post" },
    mkdir: { url: "/storage/{storage}/mkdir?path={path}", method: "post" },
    delete: { url: "/storage/{storage}/delete?path={path}", method: "post" }
};

export default {
    components: {
        Toolbar,
        Tree,
        List,
        // Upload
    },
    data() {
        return {
            loading: 0,
            path: "",
            activeStorage: null,
            uploadingFiles: false, // or an Array of files
            refreshPending: false,
            axiosInstance: null
        };
    },
    props: {
        storages:{
            type: String ,
            default:() => availableStorages.map(item => item.code).join(",")
        },
        //
        storage: { type: String, default: "local" },
        // Tree view
        tree: { type: Boolean, default: true },
        // File icons 
        icons: { type: Object, default: () => fileIcons },
        // Backend request
        endpoints: { type: Object, default: () => endpoints },
        // custom axios instance
        axios: { type: Function },
        // custom configuration for internal axios instance
        axiosConfig: { type: Object, default: () => {} },
        // max files count to upload at once. Unlimited by default
        maxUploadFilesCount: { type: Number, default: 0 },
        // max file size to upload. Unlimited by default
        maxUploadFileSize: { type: Number, default: 0 }

    },
    computed: {
        storagesArray() {
            let storageCodes = this.storages.split(","),
                result = [];
            storageCodes.forEach(code => {
                result.push(availableStorages.find(item => item.code == code));
            });
            return result;
        }
    },
    created() {
        this.activeStorage = this.storage;
        this.axiosInstance = this.axios || axios.create(this.axiosConfig);

    },
    mounted() {
        if (!this.path && !(this.tree && this.$vuetify.breakpoint.smAndUp)) {
            this.pathChanged("/");
        }
    },
    methods: {
        loadingChanged(loading) {
            if (loading) {
                this.loading++;
            } else if (this.loading > 0) {
                this.loading--;
            }
        },
        storageChanged(storage) {
            this.activeStorage = storage;
        },

        pathChanged(path) {
            this.path = path;
            this.$emit("change", path);  ///????
        },
        addUploadingFiles(files) {
            files = Array.from(files);

            if (this.maxUploadFileSize) {
                files = files.filter(
                    file => file.size <= this.maxUploadFileSize
                );
            }

            if (this.uploadingFiles === false) {
                this.uploadingFiles = [];
            }
            
            if (this.maxUploadFilesCount && this.uploadingFiles.length + files.length > this.maxUploadFilesCount) {
                files = files.slice(0, this.maxUploadFilesCount - this.uploadingFiles.length);
            }

            this.uploadingFiles.push(...files);
        },
        uploaded() {
            this.uploadingFiles = false;
            this.refreshPending = true;
        },

    }
}
</script>

<style>

</style>