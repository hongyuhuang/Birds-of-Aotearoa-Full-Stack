// cheap hack to keep the form updated for SSR pages
// this script copies the query parameters from the URL, and puts them into the form
const query = decodeURI(window.location.search.substring(1)).replaceAll('+', ' ');
if (query && query.length > 0) {
    const params = query.split("&");
    for (const pair of params) {
        const [key, value] = pair.split("=");
        const formInput = document.querySelector(`#${key}`);
        if (formInput) {
            formInput.value = value;
        }
    }
}
