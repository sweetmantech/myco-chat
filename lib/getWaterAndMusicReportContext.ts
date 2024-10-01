const getWaterAndMusicReportContext = async (address: string) => {
    const BASE_URL = 'https://api.myco.wtf';

    const [tokensResponse, scoreResponse] = await Promise.all([
        fetch(`${BASE_URL}/api/zora/tokens?creatorAddress=${address}`),
        fetch(`${BASE_URL}/api/zora/score?address=${address}`)
    ]);

    const tokens = await tokensResponse.json();
    const score = await scoreResponse.json();

    const processedTokens = tokens.tokens.map(token => ({
        event: token.event,
        address: token.address,
        timestamp: token.timestamp,
        user: token.metadata.user,
        network: token.metadata.network,
        tokenId: token.metadata.tokenId,
        collection: token.metadata.collection,
        transactionHash: token.metadata.transactionHash
    }));

    const context = {
        zora_tokens: processedTokens.slice(0, 5),
        zora_score: score
    };

    console.log(context);
    return context;
};

export default getWaterAndMusicReportContext;