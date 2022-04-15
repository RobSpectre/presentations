import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '@/store'

describe('GameStore State', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has correct default states', () => {
    const store = useGameStore()

    expect(store.game.players).toStrictEqual([])
    expect(store.game.teams).toStrictEqual([])
    expect(store.game.rounds).toStrictEqual([])

    expect(store.game.teamCounter).toStrictEqual(0)
    expect(store.game.playerIndex).toStrictEqual(0)
    expect(store.game.playerButton).toStrictEqual(0)
  })
})

describe('GameStore Player and Team Add/Remove', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a player with name Morty', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    const expectedPlayer = {
      index: 0,
      name: 'Morty',
      score: 0,
      team: undefined
    }

    expect(store.game.players[0]).toStrictEqual(expectedPlayer)
  })

  it('adds noob noob after Morty', () => {
    const store = useGameStore()

    const expectedPlayer = {
      index: 1,
      name: 'noob noob',
      score: 0,
      team: undefined
    }

    store.addPlayer('Morty')
    store.addPlayer('noob noob')

    expect(store.game.players[1]).toStrictEqual(expectedPlayer)
  })

  it('adds noob noob before Morty', () => {
    const store = useGameStore()

    const expectedPlayer = {
      index: 0,
      name: 'noob noob',
      score: 0,
      team: undefined
    }

    store.addPlayer('Morty')
    store.addPlayer('noob noob', 0)

    expect(store.game.players[0]).toStrictEqual(expectedPlayer)
  })

  it('adds a team with name Vindicators', () => {
    const store = useGameStore()

    store.addTeam('Vindicators')

    const expectedTeam = {
      name: 'Vindicators'
    }

    expect(store.game.teams[0]).toStrictEqual(expectedTeam)
  })

  it('adds a player Morty to team Vindicators', () => {
    const store = useGameStore()

    store.addTeam('Vindicators')

    const expectedTeam = {
      name: 'Vindicators'
    }

    expect(store.game.teams[0]).toStrictEqual(expectedTeam)

    const expectedPlayer = {
      index: 0,
      name: 'Morty',
      score: 0,
      team: 'Vindicators'
    }

    store.addPlayer('Morty')

    expect(store.game.players[0]).toStrictEqual(expectedPlayer)
  })

  it('adds noob noob to Vindicators and Morty to Citadel', () => {
    const store = useGameStore()

    store.addTeam('Vindicators')
    store.addTeam('Citadel')

    const expectedTeams = [
      { name: 'Vindicators' },
      { name: 'Citadel' }
    ]

    expect(store.game.teams).toStrictEqual(expectedTeams)

    const expectedPlayer = {
      index: 0,
      name: 'noob noob',
      score: 0,
      team: 'Vindicators'
    }

    store.addPlayer('noob noob')

    expect(store.game.players[0]).toStrictEqual(expectedPlayer)

    const expectedNextPlayer = {
      index: 0,
      name: 'Morty',
      score: 0,
      team: 'Citadel'
    }

    store.addPlayer('Morty')

    expect(store.game.players[1]).toStrictEqual(expectedNextPlayer)
  })

  it('pushes Morty/Citadel ahead of noob noob/Vindicators', () => {
    const store = useGameStore()

    store.addTeam('Vindicators')
    store.addTeam('Citadel')

    const expectedTeams = [
      { name: 'Vindicators' },
      { name: 'Citadel' }
    ]

    expect(store.game.teams).toStrictEqual(expectedTeams)

    const expectedPlayer = {
      index: 0,
      name: 'noob noob',
      score: 0,
      team: 'Vindicators'
    }

    store.addPlayer('noob noob')

    expect(store.game.players[0]).toStrictEqual(expectedPlayer)

    const expectedNextPlayer = {
      index: 0,
      name: 'Morty',
      score: 0,
      team: 'Citadel'
    }

    store.addPlayer('Morty', 0)

    expect(store.game.players[0]).toStrictEqual(expectedNextPlayer)
  })

  it('deletes the player Morty', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    store.removePlayer('Morty')

    expect(store.game.players).toStrictEqual([])
  })

  it('adjust the playerButton and playerIndex based on number of players left', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('Rick')
    store.addPlayer('noob noob')

    store.increasePlayerButton()
    store.increasePlayerButton()

    store.increasePlayerIndex()
    store.increasePlayerIndex()

    store.removePlayer('Morty')

    expect(store.game.players.length).toBe(2)
    expect(store.game.playerButton).toBe(0)
    expect(store.game.playerIndex).toBe(0)
  })

  it('deletes the team Vindicators', () => {
    const store = useGameStore()

    store.addTeam('Vindicators')
    store.removeTeam('Vindicators')

    expect(store.game.teams).toStrictEqual([])
  })

  it('deletes the players when deleting the team Citadel', () => {
    const store = useGameStore()

    store.addTeam('Citadel')
    store.addTeam('Vindicators')

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    store.removeTeam('Citadel')

    expect(store.game.teams.length).toBe(1)
    expect(store.game.players.length).toBe(1)
  })

  it('does not add a player name of blank', () => {
    const store = useGameStore()

    store.addPlayer('')

    expect(store.game.players.length).toBe(0)
  })

  it('does not add a team name of blank', () => {
    const store = useGameStore()

    store.addTeam('')

    expect(store.game.teams.length).toBe(0)
  })
})

describe('GameStore Player Manipulation', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increase Morty sore by 1', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    expect(store.game.players[0].score).toBe(0)

    store.increasePlayerScore('Morty')

    expect(store.game.players[0].score).toBe(1)
  })

  it('increase Morty sore by 10', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    expect(store.game.players[0].score).toBe(0)

    store.increasePlayerScore('Morty', 10)

    expect(store.game.players[0].score).toBe(10)
  })

  it('only increase Morty score', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')

    expect(store.game.players[0].score).toBe(0)

    store.increasePlayerScore('Morty')

    expect(store.game.players[0].score).toBe(1)
    expect(store.game.players[1].score).toBe(0)
  })

  it('increase player button to noob noob', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    store.increasePlayerButton()

    expect(store.game.players[store.game.playerButton].name).toBe('noob noob')
  })

  it('cycle through all players until button is on Morty', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    store.increasePlayerButton()
    store.increasePlayerButton()
    store.increasePlayerButton()

    expect(store.game.players[store.game.playerButton].name).toBe('Morty')
  })

  it('increase player index to noob noob', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    store.increasePlayerIndex()

    expect(store.game.players[store.game.playerIndex].name).toBe('noob noob')
  })

  it('cycle through all players until index is on Morty', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    store.increasePlayerIndex()
    store.increasePlayerIndex()
    store.increasePlayerIndex()

    expect(store.game.players[store.game.playerIndex].name).toBe('Morty')
  })

  it('change player Morty to player Rick', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    store.changeAttributeOfPlayer('Morty', 'name', 'Rick')

    expect(store.game.players[0].name).toBe('Rick')
  })

  it('change player Morty to player Rick with score of 10', () => {
    const store = useGameStore()

    store.addPlayer('Morty')

    store.changeAttributesOfPlayer('Morty', [
      { attribute: 'name', value: 'Rick' },
      { attribute: 'score', value: 10 }
    ])

    expect(store.game.players[0].name).toBe('Rick')
    expect(store.game.players[0].score).toBe(10)
  })
})

describe('GameStore Getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('get two players from Citadel team', () => {
    const store = useGameStore()

    store.addTeam('Citadel')
    store.addTeam('Vindicators')

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    const expectedPlayers = [
      {
        index: 0,
        name: 'Morty',
        score: 0,
        team: 'Citadel'
      },
      {
        index: 1,
        name: 'Rick',
        score: 0,
        team: 'Citadel'
      }
    ]

    expect(store.getPlayersFromTeam('Citadel')).toStrictEqual(expectedPlayers)
  })

  it('get three players with no score', () => {
    const store = useGameStore()

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    const expectedPlayers = [
      {
        index: 0,
        name: 'Morty',
        score: 0,
        team: undefined
      },
      {
        index: 1,
        name: 'noob noob',
        score: 0,
        team: undefined
      },
      {
        index: 2,
        name: 'Rick',
        score: 0,
        team: undefined
      }
    ]

    expect(store.getPlayersByScore).toStrictEqual(expectedPlayers.reverse())
  })

  it('get three players on two teams with no score', () => {
    const store = useGameStore()

    store.addTeam('Citadel')
    store.addTeam('Vindicators')

    store.addPlayer('Morty')
    store.addPlayer('noob noob')
    store.addPlayer('Rick')

    const expectedPlayers = [
      {
        name: 'Vindicators',
        players: [
          {
            index: 0,
            name: 'noob noob',
            score: 0,
            team: 'Vindicators'
          }
        ],
        score: 0
      },
      {
        name: 'Citadel',
        players: [
          {
            index: 0,
            name: 'Morty',
            score: 0,
            team: 'Citadel'
          },
          {
            index: 1,
            name: 'Rick',
            score: 0,
            team: 'Citadel'
          }
        ],
        score: 0
      }
    ]

    expect(store.teamsWithPlayers).toStrictEqual(expectedPlayers.reverse())
  })
})
