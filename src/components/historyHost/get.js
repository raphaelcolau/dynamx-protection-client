export default async function getHistory() {
    let history = await localStorage.getItem('history');
    history = history === null ? [] : JSON.parse(history);
    return history;
}