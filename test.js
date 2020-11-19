const toJs = require('./index');
console.log(toJs('curl -X DELETE -d "id=12" --close --refresh --success "删除成功" /admin/deleteStudent'));