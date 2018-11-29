function square(size) {
    let range = [...Array(size).keys()]
    let vertices = range.map(i => {
        return range.map(j => {
            return i + ' ' + j
        })
    })
    let edges = range.map(i => {
        return range.map(j => {
            let ret = []
            if (i + 1 < size) {
                ret.push({
                    x: i + ' ' + j,
                    y: (i + 1) + ' ' + j,
                })
            }
            if (j + 1 < size) {
                ret.push({
                    x: i + ' ' + j,
                    y: i + ' ' + (j + 1),
                })
            }
            return ret
        })
    })
    let graph = {
        vertices: vertices.flat().map(v => {
            return {
                id: v,
                value: null,
            }
        }),
        edges: edges.flat().flat(),
    }
    let game = vgo(graph)
    let turn = true;
    return {
        play: function (id) {
            if (id !== null) {
                game.go_next({
                    id: id,
                    value: turn,
                })
            }
            turn = !turn
        },
        status: function () {
            return game.get_vertices()
        },
        turn: function () {
            return turn;
        }
    }
}