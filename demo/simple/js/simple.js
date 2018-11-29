function simple() {
    let graph = {
        vertices: [
            {
                id: 'TT',
                value: null,
            },
            {
                id: 'TF',
                value: null,
            },
            {
                id: 'FT',
                value: null,
            },
            {
                id: 'FF',
                value: null,
            },
        ],
        edges: [
            {
                x: 'TT',
                y: 'TF',
            },
            {
                x: 'TF',
                y: 'FF',
            },
            {
                x: 'FF',
                y: 'FT',
            },
            {
                x: 'FT',
                y: 'TT',
            },
        ],
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