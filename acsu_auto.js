// ==UserScript==
// @name         wisepoint-auto
// @namespace    https://github.com/UltiMorse/wisepoint-auto
// @version      2025-08-11
// @description  ACSUのマトリクス認証自動入力ボタン追加
// @author       UltiMorse
// @match        https://gakunin.ealps.shinshu-u.ac.jp/idp/Authn/External?conversation=*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // 設定：自動クリックするパスワード
    const PASSWORD = ['', '', '', '']; // ['A', 'B', 'C', 'D']; のようにパスワードを設定
    
    function addAutoButton() {
        if (document.getElementById('autoInputBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'autoInputBtn';
        btn.textContent = '自動入力';
        btn.type = 'button';
        btn.className = 'form-matrix-button form-button';
        btn.onclick = autoInput;
        const loginBtn = document.getElementById('btnLogin');
        if (loginBtn) {
            btn.style.height = loginBtn.offsetHeight + 'px';
            btn.style.fontSize = window.getComputedStyle(loginBtn).fontSize;
            btn.style.padding = window.getComputedStyle(loginBtn).padding;
            btn.style.marginRight = '8px';
        }
        if (loginBtn && loginBtn.parentNode) {
            loginBtn.parentNode.insertBefore(btn, loginBtn);
        } else {
            document.body.appendChild(btn);
        }
    }

    // --- クリック ---
    // i1.gif→A, i2.gif→B,...i16.gif→P, i17.gif→R,...i25.gif→Z（Qなし）で判定しクリック
    function clickMatrixChar(char) {
        const letters = [];
        for (let i = 0, code = 65; i < 25; i++, code++) {
            if (String.fromCharCode(code) === 'Q') code++;
            letters.push(String.fromCharCode(code));
        }
        const btns = document.querySelectorAll('.input_imgdiv_class');
        for (let btn of btns) {
            const bg = btn.style.backgroundImage;
            const m = bg.match(/i(\d{1,2})\.gif/i);
            if (m) {
                const idx = parseInt(m[1], 10) - 1;
                if (letters[idx] === char) {
                    btn.click();
                    return true;
                }
            }
        }
        return false;
    }
    
    async function autoInput() {
        for (const c of PASSWORD) {
            const ok = clickMatrixChar(c);
            if (!ok) {
                alert('エラー');
                return;
            }
            await new Promise(r => setTimeout(r, 2));
        }
        const loginBtn = document.getElementById('btnLogin');
        if (loginBtn) {
            setTimeout(() => loginBtn.click(), 2);
        }
    }

    function waitAndAddButton() {
        if (document.getElementById('autoInputBtn')) return;
        const matrix = document.querySelector('[id^="button0"].input_imgdiv_class');
        if (matrix) {
            addAutoButton();
            return;
        }
        const observer = new MutationObserver(() => {
            const m = document.querySelector('[id^="button0"].input_imgdiv_class');
            if (m) {
                addAutoButton();
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', waitAndAddButton);
    } else {
        waitAndAddButton();
    }

})();
