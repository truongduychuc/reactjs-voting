const Ls = {
    get(key) {
        const item = localStorage.getItem(key);
        return item ? item : null;
    },
    set(key, item) {
        localStorage.setItem(key, item);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    getPure(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    setPure(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }
};
export default Ls;
