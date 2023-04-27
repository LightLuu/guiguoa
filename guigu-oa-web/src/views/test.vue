<template>
  <div>
    <div>账号切换</div>
    <button @click="zhangsan()" type="default" size="mini">张三</button>
    <button @click="lisi()" type="default" size="mini">李四</button>
    <button @click="zzjl()" type="default" size="mini">张总经理</button>
    <button @click="admin()" type="default" size="mini">admin</button>
    <div>当前token：{{ token }}</div>
  </div>
</template>

<script>
export default {
  name: "Test",

  data() {
    return {
      token: ''
    };
  },

  created(){
    this.token = window.localStorage.getItem('token')
  },

  methods: {
    wjl() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDM3NjMwNDIx1FEqLU4t8kxRsjKCMPMSc1OBWsqzcpRqAb4pVZBAAAAA.-bW4hJ5UptFiCRsL6jVUa4XbgVwdsfVGfP8gJ-tOVbp7D3JOb8sylbBDLUhTZt6FJsYhlA5uYz8HSRck_pbaCA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    lisi() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwMjOxNDI21FEqLU4t8kxRsjKBMPMSc1OBWnIyizOVagHjhl7dQQAAAA.2K28Pe-WgrAzYPO_MQlynWXk6oRuHHVGAftxMly1y78fPBe7sT47sIsV9QUYYifRdFXMZR7yBIV_LCU2qSEa_A'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zhangsan() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwMjI0tzQx1VEqLU4t8kxRsjKHMPMSc1OBWqoyEvPSixPzlGoBGqzx60UAAAA.zR49G_Pmu6zZ-5T1tx4iU5m080dqvUKWsh-HC57qvBSGbr8mraL2Xc8VDpAV5HEUYN2y-4dWxZlctUtN3CmOLw'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    admin() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwMjI0MTGx1FEqLU4t8kwBikGYeYm5qUAtiSm5mXlKtQBE-Yf4QgAAAA.Zun47k7FuOm9acI9jTE8nL_EY6-ABl8uPUmzE3TiPNQVmCBVQUVR4-FX0YoGV12z1gEQ7O6olneZG9n35KiEHQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    }
  }
}
</script>
