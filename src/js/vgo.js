function vgo(graph) {

    let vertices = graph.vertices
    let edges = graph.edges

    let index_of_id_to_vertex = new Map()
    vertices.forEach(v => {
        index_of_id_to_vertex.set(v.id, v)
    })

    let index_of_id_to_neighbours = new Map()
    vertices.forEach(v => {
        index_of_id_to_neighbours.set(v.id, [])
    })
    edges.forEach(e => {
        index_of_id_to_neighbours.get(e.x).push(e.y)
        index_of_id_to_neighbours.get(e.y).push(e.x)
    })

    return {
        go_next: function (vertex) {
            let vert = this.get_vertex_by_id(vertex.id)
            if (vert.value !== null) {
                throw 'value in vertex'
            }
            this.set_vertex_by_id(vertex)
            try {
                let area = this.get_area_by_id(vertex.id)
                let around = this.get_neighbours_by_id(vertex.id).filter(n => {
                    let vert = this.get_vertex_by_id(n)
                    return vert.value !== null && vert.value !== vertex.value
                }).map(n => {
                    return this.get_area_by_id(n)
                })

                if (area.gases.length <= 0) {
                    if (Math.min(...around.map(a => {
                        return a.gases.length
                    }))) {
                        throw 'no gas'
                    }
                }

                around.filter(a => {
                    return a.gases.length == 0
                }).forEach(a => {
                    a.values.forEach(v => {
                        this.set_vertex_by_id({
                            id: v,
                            value: null,
                        })
                    })
                })
            } catch (e) {
                vertex.value = null
                this.set_vertex_by_id(vertex)
                throw e
            }
        },

        set_vertex_by_id: function (vertex) {
            let vert = this.get_vertex_by_id(vertex.id)
            vert.value = vertex.value
        },
        
        get_vertices: function () {
            return vertices
        },
        get_edges: function () {
            return edges
        },
        get_graph: function () {
            return {
                vertices: this.get_vertices(),
                edges: this.get_edges(),
            }
        },
        get_vertex_by_id: function (id) {
            return index_of_id_to_vertex.get(id)
        },
        get_neighbours_by_id: function (id) {
            return index_of_id_to_neighbours.get(id)
        },
        get_area_by_id: function (id) {
            let values = new Set()
            let gases = new Set()
            let iter = id => {
                let vertex = this.get_vertex_by_id(id)
                if (vertex.value === null) {
                    gases.add(id)
                    return
                }

                values.add(id)
                let neighbours = this.get_neighbours_by_id(id).filter(n => {
                    let vert = this.get_vertex_by_id(n)
                    if (vert.value === vertex.value) {
                        return values.has(n) === false
                    }
                    if (vert.value === null) {
                        return gases.has(n) === false
                    }
                    return false
                })

                neighbours.forEach(n => {
                    iter(n)
                })
            }
            iter(id)
            return {
                values: [...values],
                gases: [...gases],
            }
        }
    }
}
