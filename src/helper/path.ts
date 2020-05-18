import * as path from 'path';

const APP_PATH = {
  BUIL_DIR_PATH: path.join(process.cwd(), 'dist'),
  WORK_DIR_PATH: (dir: string = 'src') => path.join(process.cwd(), dir)
} as const

export default APP_PATH