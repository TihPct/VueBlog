<template>

  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><h1 style="color: #000000;">欢迎</h1></el-menu-item>
        <el-menu-item index="2" style="float: right">
          <el-input placeholder="输入关键词" style="width: 150px;" size="small" @blur="search"
                    v-model="searchKey"></el-input>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-scrollbar v-bind:height="innerHeight">
      <el-main id="main">
        <div v-for="item in jsonData">
          <el-scrollbar>
            <el-card class="box-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>{{ item.Name }}</span>
                  <el-button class="button" type="text" style="color: #F56C6C;" v-if="checkType(item.type)===1">
                    {{ item.type }}
                  </el-button>
                  <el-button class="button" type="text" style="color: #E6A23C;" v-if="checkType(item.type)===-1">
                    {{ item.type }}
                  </el-button>
                  <el-button class="button" type="text" style="color: #67C23A;" v-if="checkType(item.type)===-2">
                    {{ item.type }}
                  </el-button>
                  <el-button class="button" type="text" style="color: #409EFF;" v-if="checkType(item.type)===-3">
                    {{ item.type }}
                  </el-button>
                </div>
              </template>
              <div class="text item">
                <div v-if="item.MD5!==''">
                  MD5:{{ item.MD5 }}
                </div>
                <div v-if="item.Password!==''">
                  Password:{{ item.Password }}
                </div>
                <div v-if="item.Password2!==''">
                  Password2:{{ item.Password2 }}
                </div>
                <div v-if="item.Other!==''">
                  Other:{{ item.Other }}
                </div>
                <div v-if="item.QQ!==''">
                  QQ:{{ item.QQ }}
                </div>
              </div>
            </el-card>
          </el-scrollbar>
        </div>
      </el-main>

    </el-scrollbar>
  </el-container>
  <el-footer class="footer-title">
      <span>
         <br>
        当前状态：空闲
        <br>
        服务器不是很稳定，白嫖的，不过应该会一直提供支持!
         <br>
        感谢各位的支持
      </span>
  </el-footer>
</template>

<script>
// @ is an alias to /src

import request from "../utils/request";
import {ElMessage} from 'element-plus'
import {ElLoading} from 'element-plus';


export default {
  name: 'Home',
  data() {
    return {
      activeIndex: 1,
      jsonData: [],
      searchKey: '',
      innerHeight: 0,
    }
  },
  mounted() {
    window.onresize = () => {
      this.changeWindowSize();
    };
    let key = sessionStorage.getItem("searchKey");
    this.searchKey = (key === null) ? '' : key
    this.load();
  },
  methods: {
    handleSelect() {
    },
    load() {
      this.changeWindowSize();
      let loadingInstance = ElLoading.service({fullscreen: true});
      request.get("/api").then((res) => {
        if (this.searchKey !== '') {
          const array = [] = res.list;
          const rArray = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].Name.search(this.searchKey) !== -1) {
              rArray.push(array[i])
            }
          }
          this.jsonData = rArray;
        } else {
          this.jsonData = res.list
        }
        this.closeLoadingInstance(loadingInstance)
      }).catch(() => {
        this.closeLoadingInstance(loadingInstance)
        ElMessage.error('加载错误');
      })
    },
    search() {
      if (this.searchKey === null || this.searchKey === undefined) {
        ElMessage.error('请输入关键词');
        return;
      }
      sessionStorage.setItem("searchKey", this.searchKey)
      this.load();
    },
    checkType(type) {
      if (type === '' || type === null || type === undefined) {
        return;
      }
      if (type.search("极高") !== -1) {
        return 1;
      }
      if (type.search("高") !== -1) {
        return -1;
      }
      if (type.search("低") !== -1) {
        return -2;
      }
      if (type.search("中") !== -1) {
        return -3;
      }
    },
    closeLoadingInstance(loadingInstance) {
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
    },
    changeWindowSize() {
      this.innerHeight = window.innerHeight - 150;
    }
  }
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.footer-title {
  font-size: 12px;
  color: #000000;
  margin-bottom: 0;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 700px;
  height: 200px;
  box-shadow: 0 10px 20px #DCDFE6;
  border-radius: 25px;
  margin: 10px auto;
}

* {
  margin: 0;
  padding: 0;
}
</style>
