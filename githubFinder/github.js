class Github {
  constructor() {
    this.clientID = "d8630c11e3ab4ac40787";
    this.clientSecret = "4d688c380c5c0c13d49ec1ef7561ee649b2b27f5";
    this.reposCount = 5;
    this.reposSort = "created: asc";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.clientID}&client_secret=${this.clientSecret}`
    );

    const profile = await profileResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}&client_id=${this.clientID}&client_secret=${this.clientSecret}`
    );

    const repos = await reposResponse.json();

    return {
      profile,
      repos,
    };
  }
}
