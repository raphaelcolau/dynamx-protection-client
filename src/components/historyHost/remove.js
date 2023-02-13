import getHistory from './get';

export default async function removeHistory(entry) {
    const history = await getHistory();
    const newHistory = history.filter((item) => item.host !== entry);
    await localStorage.setItem('history', JSON.stringify(newHistory));
    return Promise.resolve(newHistory);
}