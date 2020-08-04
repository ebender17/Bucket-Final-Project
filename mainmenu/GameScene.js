class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create(){
    this.add.text(20,20, "GameScene");
    this.setWeather();
  }

  fetchWeather() {
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=39.1031&lon=84.5120&exclude=minutely,hourly,daily&appid=a9915cce5540225f7997bb5ed0988782')
    .then(response => response.json());
  }

  async setWeather(){
    try{
      const response = await this.fetchWeather();
      console.log(response.current.weather[0].main);
    }
    catch{
      console.log("oof");
    }
  }
}