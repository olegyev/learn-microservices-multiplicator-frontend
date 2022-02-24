class ApiClient {

    static SERVER_URL = 'http://localhost:8000';
    static GET_CHALLENGE = '/challenges/random';
    static POST_RESULT = '/attempts';
    static GET_ATTEMPTS_BY_ALIAS = '/attempts?alias=';
    static GET_USERS_BY_IDS = '/users/';
    static GET_LEADERBOARD = '/leaders';

    static challenge(): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.GET_CHALLENGE);
    }

    static sendGuess(
        user: string,
        a: number,
        b: number,
        guess: number
    ): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.POST_RESULT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        userAlias: user,
                        factorA: a,
                        factorB: b,
                        guess: guess
                    }
                )
            });
    }

    static getAttempts(userAlias: string): Promise<Response> {
        return fetch(ApiClient.SERVER_URL +
                     ApiClient.GET_ATTEMPTS_BY_ALIAS +
                     userAlias);
    }

    static getUsers(userIds: number[]): Promise<Response> {
        return fetch(ApiClient.SERVER_URL +
                     ApiClient.GET_USERS_BY_IDS +
                     userIds.join(','));
    }

    static leaderBoard(): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.GET_LEADERBOARD);
    }

}

export default ApiClient;