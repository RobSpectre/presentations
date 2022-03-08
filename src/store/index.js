import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const state = {
  game: {
    players: [],
    teams: [],
    rounds: [],
    teamCounter: 0,
    playerIndex: 0,
    playerButton: 0
  }
}

const getters = {
  teamsWithPlayers: state => {
    if (state.game.teams === undefined) {
      return state.game.teams
    }
    var teamsWithPlayers = []

    state.game.teams.forEach(function (team) {
      var individualScores = []

      team.players = state.game.players.filter(player => team.name === player.team)
      team.players.forEach(function (player) {
        individualScores.push(player.score)
      })
      team.score = individualScores.reduce(function (a, b) {
        return a + b
      }, 0)

      teamsWithPlayers.push(team)
    })

    return teamsWithPlayers
  },
  getPlayersFromTeam: state => teamName => {
    return state.game.players.filter(player => teamName === player.team)
  },
  getPlayersByScore: state => {
    const players = []
    state.game.players.forEach(function (player) {
      players.push(player)
    })
    return players.sort((a, b) => a.score - b.score).reverse()
  }
}

const mutations = {
  addPlayer (state, payload) {
    if (payload.name.trim() === '') {
      return
    }
    if (state.game.teams.length > 0) {
      if (state.game.teamCounter > state.game.teams.length - 1) {
        state.game.teamCounter = 0
      }

      const player = {
        index: state.game.teams[state.game.teamCounter].players.length,
        name: payload.name,
        score: 0,
        team: state.game.teams[state.game.teamCounter].name
      }

      if (payload.index) {
        state.game.players.splice(payload.index, 0, player)
      } else {
        state.game.players.push(player)
      }

      state.game.teamCounter++
    } else {
      state.game.teamCounter = 0

      const player = {
        index: state.game.players.length,
        name: payload.name,
        score: 0,
        team: undefined
      }

      if (payload.index === undefined) {
        state.game.players.push(player)
      } else {
        player.index = payload.index
        state.game.players.splice(payload.index, 0, player)
      }
    }
  },
  removePlayer (state, name) {
    state.game.players = state.game.players.filter(player => name !== player.name)
  },
  changeAttributeOfPlayer (state, payload) {
    const newPlayers = []

    state.game.players.forEach(function (player) {
      if (player.name === payload.player_name) {
        player[payload.attribute] = payload.value
      }
      newPlayers.push(player)
    })

    state.game.players = newPlayers
  },
  changeAttributesOfPlayer (state, payload) {
    var newPlayers = []

    state.game.players.forEach(function (player) {
      if (player.name === payload.playerName) {
        payload.attributes.forEach(function (attribute) {
          player[attribute.attribute] = attribute.value
        })
      }

      newPlayers.push(player)
    })

    state.game.players = newPlayers
  },
  addTeam (state, payload) {
    if (payload.name.trim() === '') {
      return
    }
    state.game.teams.push({
      name: payload.name,
      score: 0
    })
  },
  removeTeam (state, name) {
    state.game.teams = state.game.teams.filter(team => name !== team.name)

    state.game.players = state.game.players.filter(player => name !== player.team)

    if (state.game.teams === undefined) {
      state.game.teams = []
    }
  },
  increasePlayerScore (state, payload) {
    var newPlayers = []

    state.game.players.forEach(function (player) {
      if (player.name === payload.playerName) {
        player.score = player.score + payload.value
      }
      newPlayers.push(player)
    })

    state.game.players = newPlayers
  },
  increasePlayerButton (state) {
    state.game.playerButton++

    if (state.game.playerButton >= state.game.players.length) {
      state.game.playerButton = 0
    }

    state.game.playerIndex = state.game.playerButton
  },
  increasePlayerIndex (state) {
    state.game.playerIndex++

    if (state.game.playerIndex >= state.game.players.length) {
      state.game.playerIndex = 0
    }
  }
}

const actions = {
}

const game = createStore({
  state () {
    return state
  },
  getters () {
    return getters
  },
  mutations () {
    return mutations
  },
  actions () {
    return actions
  }
})

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage
  }).plugin(game)
}
