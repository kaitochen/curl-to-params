const toJs = require("./index");
// const str = "curl  -X POST --close --refresh    -d   'name=陈同学'    -d 'age=19' -d 'hobby=['爬山','旅游']' -d 'classify=[{'value':'red\','name':'红色'}]' -d 'accessory=http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/e900457a-760d-4e04-99eb-c04e6c3011db/%E5%B0%8F%E7%A4%BC%E6%9C%8D.png' -d 'birthday=2000-06-07' -d 'createDate=2020-11-19 16:37:50' -d 'headImage=http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/f962ec0f-50cd-4f0f-b12b-304e11c49d47/head-logo.png' -d 'id=7' -d 'images=http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/8252797b-466e-44f3-a9d0-b6786cd5379e/head-logo.png,http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/08c71e3d-3354-41a8-af23-4ab5a4ea39a1/get.png' -d 'introduction=高三' -d 'provinceCityDistrict=01,0101,010101' -d 'rating=8' -d 'signature=风一样的男子'   /admin/access/v1/user/student/update/7'"
const str = `curl -X POST --back --success '新增成功！' --type 'formData' -d 'aajsdoasd' -d 'age=18' -d 'provinceCityDistrict=[]' -d 'hobby=["读书","爬山","旅游"]' -d 'birthday=2020-11-05' -d 'rating=6.5' -d 'classify=[{"value":"red","name":"红色"}]' -d 'introduction=这是介绍""\\'\\'”“‘’aa' -d 'headImage=[]' -d 'images=[]' -d 'accessory=[]' -d 'signature=<p>这是介绍""\\'\\'&rdquo;&ldquo;&lsquo;&rsquo;aa</p>' /admin/access/v1/user/student/add`;
const code = toJs(str);
const data = code.body.split("&&");
data.forEach((item) => {
  try {
    console.log(JSON.parse(item));
  } catch (e) {
    console.log("err", item);
  }
});
