let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/work/projects/rpguild/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +12 App.tsx
badd +1 services/firebase-admin.js
badd +26 services/firebase.js
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
badd +2 components/AuthRoute.tsx
badd +6 App.test.tsx
badd +22 components/Carousel/Carousel.js
badd +5 store/character.ts
badd +5 components/Navbar/index.js
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
badd +40 pages/CreateQuest.tsx
badd +3 components/ApplyQuest/index.ts
badd +1 components/ApplyQuest/ApplyQuest.tsx
badd +3 components/SiteNavbar/index.ts
badd +14 components/SiteNavbar/SiteNavbar.tsx
badd +1 components/ApplyQuest/CharacterTile.tsx
badd +9 pages/ApplyQuest.tsx
badd +10 components/CharacterTile/CharacterTile.tsx
badd +36 components/QuestTile/QuestTile.tsx
badd +259 pages/QuestList.tsx
badd +158 components/QuestTile/style.module.scss
badd +1 helpers/quest.ts
badd +3 helpers/questListReducer.ts
badd +11 App.css
badd +47 styles/QuestList.module.scss
badd +26 components/SignText.tsx
badd +6 components/QuestTile/index.ts
badd +1 components/QuestTile/SelectedQuestTileWrapper.tsx
badd +88 components/QuestTile/HelpTile.tsx
badd +108 components/QuestTile/Controls.tsx
argglobal
%argdel
$argadd App.tsx
set stal=2
edit helpers/questListReducer.ts
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
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
5
normal! zo
let s:l = 76 - ((34 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
76
normal! 015|
lcd ~/work/projects/rpguild/src
tabedit ~/work/projects/rpguild/src/pages/QuestList.tsx
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
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
1
normal! zo
28
normal! zo
29
normal! zo
32
normal! zo
37
normal! zo
40
normal! zo
45
normal! zo
48
normal! zo
56
normal! zo
59
normal! zo
67
normal! zo
91
normal! zo
98
normal! zo
100
normal! zo
101
normal! zo
106
normal! zo
110
normal! zo
111
normal! zo
121
normal! zo
122
normal! zo
130
normal! zo
137
normal! zo
140
normal! zo
146
normal! zo
148
normal! zo
152
normal! zo
164
normal! zo
166
normal! zo
170
normal! zo
179
normal! zo
187
normal! zo
189
normal! zo
193
normal! zo
205
normal! zo
207
normal! zo
213
normal! zo
218
normal! zo
219
normal! zo
227
normal! zo
237
normal! zo
238
normal! zo
241
normal! zo
249
normal! zo
253
normal! zo
267
normal! zo
268
normal! zo
let s:l = 270 - ((32 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
270
normal! 0
lcd ~/work/projects/rpguild/src
wincmd w
argglobal
if bufexists("~/work/projects/rpguild/src/styles/QuestList.module.scss") | buffer ~/work/projects/rpguild/src/styles/QuestList.module.scss | else | edit ~/work/projects/rpguild/src/styles/QuestList.module.scss | endif
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
46
normal! zo
let s:l = 53 - ((29 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
53
normal! 025|
lcd ~/work/projects/rpguild/src
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 104 + 104) / 208)
exe 'vert 2resize ' . ((&columns * 103 + 104) / 208)
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
