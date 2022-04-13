import { defineStore } from 'pinia'

function state () {
  return {
    game: {
      players: [],
      teams: [],
      rounds: [],
      teamCounter: 0,
      playerIndex: 0,
      playerButton: 0
    }
  }
}

const getters = {
  teamsWithPlayers (state) {
    const teamsWithPlayersList = []

    state.game.teams.forEach(function (team) {
      const individualScores = []

      team.players = state.game.players.filter(player => team.name === player.team)
      team.players.forEach(function (player) {
        individualScores.push(player.score)
      })
      team.score = individualScores.reduce(function (a, b) {
        return a + b
      }, 0)

      teamsWithPlayersList.push(team)
    })

    return teamsWithPlayersList
  },
  getPlayersFromTeam: (state) => (teamName) => {
    return state.game.players.filter(player => teamName === player.team)
  },
  getPlayersByScore (state) {
    const players = []
    state.game.players.forEach(function (player) {
      players.push(player)
    })
    return players.sort((a, b) => a.score - b.score).reverse()
  }
}

const actions = {
  addPlayer (name, index) {
    if (name.trim() === '') {
      return
    }

    if (this.game.teams.length > 0) {
      if (this.game.teamCounter >= this.game.teams.length) {
        this.game.teamCounter = 0
      }

      let teamIndex = 0

      const teamName = this.game.teams[this.game.teamCounter].name
      const playersFromTeam = this.getPlayersFromTeam(teamName)

      if (playersFromTeam.length > 0) {
        teamIndex = playersFromTeam.length
      }

      const player = {
        index: teamIndex,
        name: name,
        score: 0,
        team: this.game.teams[this.game.teamCounter].name
      }

      if (index === undefined) {
        this.game.players.push(player)
      } else {
        this.game.players.splice(index, 0, player)
      }

      this.game.teamCounter++
    } else {
      this.game.teamCounter = 0

      const player = {
        index: this.game.players.length,
        name: name,
        score: 0,
        team: undefined
      }

      if (index === undefined) {
        this.game.players.push(player)
      } else {
        player.index = index
        this.game.players.splice(index, 0, player)
      }
    }
  },
  removePlayer (name) {
    this.game.players = this.game.players.filter(player => name !== player.name)
  },
  changeAttributeOfPlayer (name, attribute, value) {
    const newPlayers = []

    this.game.players.forEach((player) => {
      if (player.name === name) {
        player[attribute] = value
      }
      newPlayers.push(player)
    })

    this.game.players = newPlayers
  },
  changeAttributesOfPlayer (name, attributes) {
    var newPlayers = []

    this.game.players.forEach((player) => {
      if (player.name === name) {
        attributes.forEach((attribute) => {
          player[attribute.attribute] = attribute.value
        })
      }

      newPlayers.push(player)
    })

    this.game.players = newPlayers
  },
  addTeam (name) {
    if (name.trim() === '') {
      return
    }
    this.game.teams.push({
      name: name
    })
  },
  removeTeam (name) {
    this.game.teams = this.game.teams.filter(team => name !== team.name)

    this.game.players = this.game.players.filter(player => name !== player.team)
  },
  increasePlayerScore (name, value) {
    var newPlayers = []

    if (value === undefined) {
      value = 1
    }

    this.game.players.forEach((player) => {
      if (player.name === name) {
        player.score = player.score + value
      }
      newPlayers.push(player)
    })

    this.game.players = newPlayers
  },
  increasePlayerButton () {
    this.game.playerButton++

    if (this.game.playerButton >= this.game.players.length) {
      this.game.playerButton = 0
    }

    this.game.playerIndex = this.game.playerButton
  },
  increasePlayerIndex () {
    this.game.playerIndex++

    if (this.game.playerIndex >= this.game.players.length) {
      this.game.playerIndex = 0
    }
  }
}

export const useGameStore = defineStore({
  id: 'hack.party game board',
  state: state,
  getters: getters,
  actions: actions,
  persist: true
})
