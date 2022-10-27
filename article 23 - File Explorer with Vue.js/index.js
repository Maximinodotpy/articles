const app = Vue.createApp({
    data() {
        return {
            path: '',
            current: 'Hello.txt',
            tree: {
                'Hello.txt': {
                    type: 'file',
                    content: 'Hello How Are You'
                },
                'Folder': {
                    type: 'folder',
                    content: {}
                },
            }
        }
    },
    methods: {
        openAction: function (name, item) {

            if (item.type === 'folder') {
                this.path += this.path == '' ? name : '/' + name
            }
        },

        goUp() {
            const newPath = this.path.split('/');
            
            newPath.pop();

            this.path = newPath.join('/')
        },

        getTree() {
            if (this.path == '') return this.tree
    
            try {
                return this.path.split('/').reduce((pre, current) => {
                    return pre[current].content
                }, this.tree)
            } catch (err) {
                return undefined
            }
        },

        addFolder() {
            const currentTree = this.getTree()
            
            currentTree['New Folder'] = {
                type: 'folder',
                content: {}
            }
        },
        
        addFile() {
            const currentTree = this.getTree()
            
            currentTree['New File'] = {
                type: 'file',
                content: ''
            }
        },
        
        deleteItem() {
            const currentTree = this.getTree()

            delete currentTree[this.current]

            this.current = ''
        },

        nameChangeRequest(ev, ogKey) {            
            this.getTree()[ev.target.value] = this.getTree()[ogKey]

            delete this.getTree()[ogKey]

            this.current = ev.target.value

            ev.target.blur();
        }
    },
    computed: {
        focusedItemExists() {
            return !Object.keys(this.getTree()).includes(this.current)
        }
    },
    watch: {
        tree: {
            handler(newValue, oldValue) {
                localStorage.setItem('vue-explorer', JSON.stringify(this.tree))
            },
            deep: true,
        }
    },
    mounted() {
        const cachedTree = localStorage.getItem('vue-explorer')

        if (cachedTree) {
            this.tree = JSON.parse(cachedTree)
        }
    }
})


app.mount('#vueapp')