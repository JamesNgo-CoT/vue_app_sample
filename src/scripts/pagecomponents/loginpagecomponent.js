/* global authFormComponent */

/* exported loginPageComponent */
const loginPageComponent = {
  template: /* html */ `
    <div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">
          <h2>Login Required</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non blandit metus. Praesent et gravida ipsum, id eleifend massa. Curabitur quis elit ut libero efficitur aliquet. Curabitur posuere, justo in venenatis tincidunt, orci nibh imperdiet elit, sit amet efficitur urna metus tincidunt lectus. Maecenas posuere nulla a lorem imperdiet rhoncus. Aliquam erat volutpat. In pellentesque feugiat lectus, id porttitor mauris tristique quis. Duis nec nisi hendrerit, consequat ipsum eu, mattis augue. Pellentesque eu arcu efficitur, condimentum mi id, ornare leo. Maecenas scelerisque libero vitae purus malesuada, rhoncus dapibus sem elementum. Morbi pharetra efficitur felis condimentum cursus. Etiam bibendum porta mi sit amet mollis. Phasellus in sapien augue. Suspendisse ac arcu et velit facilisis sodales a ac sapien. Praesent vitae fringilla turpis, placerat finibus turpis. Aliquam sodales tellus convallis, ultricies ex at, placerat enim.</p>
          <p>Nam vel ultricies elit. Aliquam quis vehicula mauris, at dapibus lacus. Ut semper, metus at faucibus finibus, lacus enim pulvinar erat, ac porta turpis diam eget tellus. Pellentesque odio dui, aliquam in erat ac, aliquam malesuada lorem. Vivamus id placerat lectus. Vestibulum sit amet mi at mi volutpat euismod. Nulla nec orci ligula. Quisque et lacus elementum, maximus risus nec, auctor sem.</p>
          <p>Integer facilisis purus eget diam ullamcorper, vitae interdum ante egestas. Cras convallis efficitur diam, vel varius enim. Praesent tristique sem nunc. Integer eget mi dolor. Donec hendrerit ornare maximus. Maecenas faucibus orci elit, eu imperdiet quam consectetur at. Quisque vel quam enim. Aliquam nec justo erat. Duis ornare tortor et risus consequat eleifend. Proin accumsan vulputate quam et accumsan. Vestibulum tempor vehicula tincidunt. Cras quis malesuada urna. Aliquam venenatis auctor posuere. Nam dictum ullamcorper tellus eget tempor.</p>
          <p>Proin imperdiet euismod massa, nec posuere sapien bibendum vel. Nulla elit neque, feugiat ut leo semper, rhoncus feugiat mi. Donec feugiat, est quis tincidunt mattis, magna ex elementum nisi, a mattis risus purus non nibh. Nullam aliquam ultrices erat eu cursus. Pellentesque commodo magna ut mi commodo pellentesque. Nulla in neque lacus. Fusce eu sem a arcu aliquet sodales. Aenean eu magna vitae velit rhoncus condimentum.</p>
          <p>Aliquam a bibendum velit. Integer condimentum, lacus ut dapibus eleifend, mi tortor malesuada purus, vitae accumsan diam risus non nisl. Maecenas condimentum, quam in elementum bibendum, leo magna sollicitudin lacus, a pellentesque dolor neque a risus. In augue ante, eleifend at placerat congue, vulputate sit amet metus. Pellentesque eu ultrices elit. Quisque non viverra diam, eu gravida elit. Vivamus aliquam, lorem quis faucibus pretium, lectus orci pretium ex, condimentum congue mauris diam id arcu. Nunc non finibus nibh. Vestibulum vitae lacinia turpis. Donec efficitur, erat eu blandit lobortis, tellus diam rutrum magna, condimentum vehicula nunc risus ut dui. Suspendisse potenti. Mauris arcu felis, congue eu magna ac, bibendum pretium arcu. Donec cursus sit amet libero ut volutpat.</p>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <authFormComponent v-on:success="onSuccess"></authFormComponent>
        </div>
      </div>
    </div>
  `,

  methods: {
    onSuccess(formValue, authFormComponent) {
      this.$emit('success', formValue, authFormComponent, this);
    }
  },

  components: {
    authFormComponent
  }
}
