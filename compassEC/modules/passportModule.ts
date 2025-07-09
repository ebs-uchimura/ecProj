/**
 * passportModule.ts
 *
 * module：passport用
 **/

'use strict';

// 認証
export const isAuthenticated = (req: any, res: any, next: any): void => {
  try {
    if (req.isAuthenticated('userLocal')) {  // 認証済
      return next();
    }
    else {
      res.redirect('/auth/login');  // ログイン画面に遷移
    }

  } catch (e) {
    // エラー
    console.log(e);
  }
};

// 管理者認証
export const isAdminAuthenticated = (req: any, res: any, next: any): void => {
  try {
    if (req.isAuthenticated('adminLocal')) {  // 認証済
      return next();
    }
    else {
      res.redirect('/manage/login');  // ログイン画面に遷移
    }

  } catch (e) {
    // エラー
    console.log(e);
  }
};
