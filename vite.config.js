import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((mode)=>{
  const env = loadEnv(mode.mode, process.cwd())
  const api_url = env.VITE_APP_API_URL;
  console.log(api_url)
  return {
    plugins: [vue()],
    server : {
      port:80,
      host:'0.0.0.0',
      proxy:{
        '/api':{
          target : api_url,
          changeOrigin: true,
        },
        '/ws':{
          target : api_url,
          changeOrigin :true,
          ws : true,
          rewrite : (path)=>path.replace(/^\/ws/, '')
        }
      }
    },
  }
});