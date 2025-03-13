class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map() // <Key>:<Node Address>
        this.head = null
        this.tail = null
    }

    #removeNode(node){
        if (!node){
            return;
        }
        if (node.prev){
            node.prev.next = node.next
        }
        if (node.next){
            node.next.prev = node.next
        }

        if (node === this.head){
            this.head = node.next
        }

        if (node === this.tail){
            this.tail = node.prev
        }
    }

    get(key){

    }

    put(key,value){
        if (this.length === this.capacity){
            if (!this.map.has(key)){
                this.#removeNode(this.map.get(key))
            }
        }
        // If Key is their remove it
        if (this.map.has(key)){
            this.#removeNode(this.map.get(key))
        }

        const node = {
            next : this.next,
            prev : null,
            value,
        }

        this.map.set(key,node);
        this.head = node

        if (this.tail == null){
            this.tail == node
        }

        this.length += 1
    }
}