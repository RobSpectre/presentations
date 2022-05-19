/* eslint no-undef: "off" */
export const mocks = {
  Audio: {
    pause: jest.fn(),
    play: jest.fn(),
    addEventListener: jest.fn().mockImplementationOnce((event, callback) => {
      callback()
    }),
    currentTime: 12,
    duration: 16
  }
}
