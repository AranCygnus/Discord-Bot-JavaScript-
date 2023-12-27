const pd = {
    le: "<:_le:1131957729041326190>",
    me: "<:_me:1131957771957440532>",
    re: "<:_re:1131957805247639603>",
    lf: "<:_lf:1131957851645030432>",
    mf: "<:_mf:1131957877666488350>",
    rf: "<:_rf:1131957904342261760>"
}

function formatResults(upVotes = [], downVotes = []) {
    const totalVotes = upVotes.length + downVotes.length;
    const progressBarLength = 14
    const filledSquares = Math.round((upVotes.length / totalVotes) * progressBarLength ) || 0;
    const emptySquares = progressBarLength - filledSquares || 0

    if (!filledSquares && !emptySquares) {
        emptySquares = progressBarLength;
    }


    const upPercentage = (upVotes.length / totalVotes ) * 100 || 0;
    const downPercentage = (downVotes.length / totalVotes ) * 100 || 0;


    const progressBar =
        (filledSquares ? pd.lf : pd.le) +
        (pd.mf.repeat(filledSquares) + pd.me.repeat(emptySquares)) +
        (filledSquares === progressBarLength ? pd.rf : pd.re);


    const result = [];
    result.push(
        `✅ ${upVotes.length} (${upPercentage.toFixed(1)}%) ※ ❎ ${downVotes.length} (${downPercentage.toFixed(1)}%)`
    );

    result.push(progressBar);

    return result.join('\n');

}

module.exports = formatResults;