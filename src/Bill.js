export default class Bill {
    constructor() {
        this._amount = 0;
        this._people = 0;
        this._percentageTip = 0;
        this._tip = 0;
        this._total = 0;
    }

    set amount(value) {
        this._amount = parseFloat(value) || 0;
    }

    set people(value) {
        this._people = parseFloat(value) || 0;
    }

    set percentageTip(value) {
        this._percentageTip = parseFloat(value) || 0;
    }

    set tip(value) {
        this._tip = isFinite(value) ? value : 0;
    }

    set total(value) {
        this._total = isFinite(value) ? value : 0;
    }

    get tip() {
        return this._tip.toString();
    }

    get total() {
        return this._total.toString();
    }

    split() {
        let totalTip = (this._percentageTip / 100) * this._amount;
        this.total = (totalTip + this._amount) / this._people;
        this.tip = totalTip / this._people;
    }
    reset() {
        this.amount = 0;
        this.people = 0;
        this.percentageTip = 0;
        this.tip = 0;
        this.total = 0;
    }
}
