class NitroGen {
  constructor() {
    this.DISCORD_API_URL = "https://api.discord.gx.games/v1/direct-fulfillment";
    this.DISCORD_BASE_URL = "https://discord.com/billing/partner-promotions";
    this.PROMOTION_ID = "1180231712274387115";
  }

  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (k) {
      const rnd = 16 * Math.random() | 0;
      return ("x" === k ? rnd : 3 & rnd | 8).toString(16)
    }));
  }

  async initRequestToDiscord(uuid) {
    const obj = {
      partnerUserId: uuid
    };
    try {
      const res = await fetch(this.DISCORD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.log("Error:", err);
    }
  }

  async generateAndShowPromoUrl(uuid) {
    const e = await this.initRequestToDiscord(uuid), r = `${this.DISCORD_BASE_URL}/${this.PROMOTION_ID}/${e.token}`;
    e && console.log(r);
  }

  claimRewards() {
    const uuid = this.generateUUID();
    this.generateAndShowPromoUrl(uuid);
  }
}

const nitroGen = new NitroGen();
nitroGen.claimRewards();
