class Scores {
  private steps = 0;

  private errorSteps = 0;

  private readonly startTime = Date.now();

  public increment(error: boolean = false) {
    this.steps += 1;

    if (error) this.errorSteps += 1;
  }

  public stop() {
    const seconds = Math.round((Date.now() - this.startTime) / 3600);

    return (this.steps - this.errorSteps) * 100 - seconds * 10 || 0;
  }
}

export default Scores;
