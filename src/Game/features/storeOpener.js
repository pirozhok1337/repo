export default class StoreOpener {
    openStore = (root) => {
        let shop = root?.state?.shop;

        if (!shop) return;

        if (!shop.enabled) {
            shop.enabled = true;
            console.log(`[SHIZOVAL] The store is open`);
        }
    }
}