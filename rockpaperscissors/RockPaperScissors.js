class RockPaperScissors {
    constructor() {
        this.cpuChoice = "";
        this.userScore = 0;
        this.cpuScore = 0;
        this.round = 0;
    }

    generateCPUResponse() {
        const acceptedValues = [`rock`, `paper`, `scissors`];
        var cpuChoice = acceptedValues[Math.floor(Math.random() * (3)) + 0];
        this.cpuChoice = cpuChoice;
        return cpuChoice;
    }

    determineWinner(userSelection, cpuSelection) {
        if (userSelection == cpuSelection) {
            this.cpuScore++;
            this.userScore++;
            this.round++;
            return 'tie';
        }
        else if ((userSelection == "rock" && cpuSelection == "scissors") || (userSelection == "paper" && cpuSelection == "rock") || (userSelection == "scissors" && cpuSelection == "paper")) {
            this.userScore++;
            this.round++
            return 'win'
        }
        else {
            this.cpuScore++;
            this.round++;
            return 'lose';
        }
    }

    play(userSelection) {
        var cpuSelection = this.generateCPUResponse();
        var result = this.determineWinner(userSelection, cpuSelection);

        if (this.round == 6) {
            if (this.userScore > this.cpuScore) {
                return "playerWin";
            }
            else if (this.userScore < this.cpuScore) {
                return "cpuWin";
            }
        }
        else {
            return "inProgress";
        }
    }
}

