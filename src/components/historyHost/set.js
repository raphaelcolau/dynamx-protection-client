import getHistory from "./get";

export default async function setHistory(entry) {
    const history = await getHistory();
    const newHistory = history.filter((item) => item.host !== entry);
    newHistory.unshift({host: entry});
    await localStorage.setItem('history', JSON.stringify(newHistory));
    return Promise.resolve(newHistory);
}