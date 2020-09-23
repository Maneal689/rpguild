let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/work/projects/rpguild/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +68 App.tsx
badd +1 services/firebase-admin.js
badd +21 services/firebase.js
badd +9 helpers/auth.js
badd +11 store/index.ts
badd +1 store/usersReducer.ts
badd +13 store/userReducer.ts
badd +8 pages/Home.tsx
badd +99 ~/.config/nvim/plugins.vim
badd +1 ~/.config/nvim/ft.vim
badd +99 ~/.vimrc
badd +19 pages/Dashboard.tsx
badd +1 index.tsx
badd +1 store/user.ts
badd +6 components/LoginRoute.tsx
badd +5 components/AuthRoute.tsx
badd +6 App.test.tsx
badd +22 components/Carousel/Carousel.js
badd +5 store/character.ts
badd +7 components/Navbar/index.js
badd +7 components/Navbar/Navbar.js
badd +6 components/Navbar/navbar.module.css
badd +3 styles/dashboard.module.scss
badd +7 components/Tabs/index.js
badd +13 components/Tabs/Tab.tsx
badd +1 components/Tabs/TabToggler.tsx
badd +3 components/CharactersTab/index.ts
badd +43 components/CharactersTab/CharactersTab.tsx
badd +2 components/Selection/index.ts
badd +85 components/Selection/Selection.tsx
badd +9 types/Quest.ts
badd +53 pages/Quest.tsx
badd +55 pages/CreateQuest.tsx
badd +3 components/ApplyQuest/index.ts
badd +1 components/ApplyQuest/ApplyQuest.tsx
badd +3 components/SiteNavbar/index.ts
badd +14 components/SiteNavbar/SiteNavbar.tsx
badd +1 components/ApplyQuest/CharacterTile.tsx
badd +9 pages/ApplyQuest.tsx
badd +10 components/CharacterTile/CharacterTile.tsx
badd +1 components/QuestTile/QuestTile.tsx
badd +10 pages/QuestList.tsx
badd +14 components/QuestTile/style.module.scss
argglobal
%argdel
$argadd App.tsx
set stal=2
edit components/QuestTile/QuestTile.tsx
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 104 + 104) / 208)
exe 'vert 2resize ' . ((&columns * 103 + 104) / 208)
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
21
normal! zo
35
normal! zo
48
normal! zo
66
normal! zo
let s:l = 35 - ((13 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
35
normal! 09|
wincmd w
argglobal
if bufexists("components/QuestTile/style.module.scss") | buffer components/QuestTile/style.module.scss | else | edit components/QuestTile/style.module.scss | endif
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
13
normal! zo
27
normal! zo
let s:l = 13 - ((12 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 05|
wincmd w
exe 'vert 1resize ' . ((&columns * 104 + 104) / 208)
exe 'vert 2resize ' . ((&columns * 103 + 104) / 208)
tabedit pages/QuestList.tsx
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
28
normal! zo
135
normal! zo
198
normal! zo
200
normal! zo
201
normal! zo
223
normal! zo
227
normal! zo
228
normal! zo
239
normal! zo
240
normal! zo
208
normal! zo
223
normal! zo
227
normal! zo
228
normal! zo
239
normal! zo
240
normal! zo
217
normal! zo
227
normal! zo
228
normal! zo
239
normal! zo
240
normal! zo
239
normal! zo
240
normal! zo
227
normal! zo
228
normal! zo
239
normal! zo
240
normal! zo
226
normal! zo
230
normal! zo
231
normal! zo
234
normal! zo
240
normal! zo
242
normal! zo
243
normal! zo
244
normal! zo
let s:l = 54 - ((41 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
54
normal! 024|
tabedit App.tsx
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
22
normal! zo
58
normal! zo
let s:l = 70 - ((29 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
70
normal! 020|
tabnext 2
set stal=1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOF
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
