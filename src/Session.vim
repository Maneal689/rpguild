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
badd +13 services/firebase.js
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
badd +22 components/Navbar/Navbar.js
badd +6 components/Navbar/navbar.module.css
badd +3 styles/dashboard.module.scss
badd +7 components/Tabs/index.js
badd +13 components/Tabs/Tab.tsx
badd +1 components/Tabs/TabToggler.tsx
badd +3 components/CharactersTab/index.ts
badd +43 components/CharactersTab/CharactersTab.tsx
badd +2 components/Selection/index.ts
badd +85 components/Selection/Selection.tsx
badd +6 types/Quest.ts
badd +138 pages/Quest.tsx
badd +35 pages/CreateQuest.tsx
badd +3 components/ApplyQuest/index.ts
badd +1 components/ApplyQuest/ApplyQuest.tsx
badd +3 components/SiteNavbar/index.ts
badd +14 components/SiteNavbar/SiteNavbar.tsx
badd +1 components/ApplyQuest/CharacterTile.tsx
badd +87 pages/ApplyQuest.tsx
badd +10 components/CharacterTile/CharacterTile.tsx
badd +66 components/QuestTile/QuestTile.tsx
badd +172 pages/QuestList.tsx
badd +158 components/QuestTile/style.module.scss
badd +48 helpers/quest.ts
badd +76 helpers/questListReducer.ts
badd +11 App.css
badd +59 styles/QuestList.module.scss
badd +26 components/SignText.tsx
badd +6 components/QuestTile/index.ts
badd +1 components/QuestTile/SelectedQuestTileWrapper.tsx
badd +88 components/QuestTile/HelpTile.tsx
badd +9 components/QuestTile/Controls.tsx
badd +25 pages/Selection.tsx
badd +54 components/CharacterTile/Controls.tsx
badd +24 components/QuestRooms/QuestRooms.tsx
badd +0 types/Character.ts
badd +5 hooks/useInputs.ts
argglobal
%argdel
$argadd App.tsx
set stal=2
edit components/QuestRooms/QuestRooms.tsx
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
23
normal! zo
let s:l = 43 - ((9 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
43
normal! 0
lcd ~/work/projects/rpguild/src
tabedit ~/work/projects/rpguild/src/pages/Quest.tsx
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
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
15
normal! zo
21
normal! zo
32
normal! zo
36
normal! zo
37
normal! zo
48
normal! zo
52
normal! zo
53
normal! zo
63
normal! zo
64
normal! zo
66
normal! zo
73
normal! zo
75
normal! zo
76
normal! zo
85
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
48
normal! zo
52
normal! zo
53
normal! zo
63
normal! zo
64
normal! zo
66
normal! zo
73
normal! zo
75
normal! zo
76
normal! zo
85
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
50
normal! zo
54
normal! zo
55
normal! zo
63
normal! zo
64
normal! zo
66
normal! zo
73
normal! zo
75
normal! zo
76
normal! zo
85
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
65
normal! zo
66
normal! zo
68
normal! zo
75
normal! zo
77
normal! zo
78
normal! zo
85
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
87
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
92
normal! zo
93
normal! zo
99
normal! zo
101
normal! zo
102
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
94
normal! zo
95
normal! zo
101
normal! zo
103
normal! zo
104
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
114
normal! zo
117
normal! zo
118
normal! zo
126
normal! zo
127
normal! zo
136
normal! zo
137
normal! zo
138
normal! zo
146
normal! zo
147
normal! zo
148
normal! zo
150
normal! zo
176
normal! zo
184
normal! zo
192
normal! zo
116
normal! zo
119
normal! zo
120
normal! zo
128
normal! zo
129
normal! zo
139
normal! zo
140
normal! zo
141
normal! zo
143
normal! zo
150
normal! zo
150
normal! zo
152
normal! zo
152
normal! zo
153
normal! zo
154
normal! zo
156
normal! zo
158
normal! zo
159
normal! zo
163
normal! zo
174
normal! zo
191
normal! zo
199
normal! zo
207
normal! zo
169
normal! zo
178
normal! zo
179
normal! zo
181
normal! zo
183
normal! zo
184
normal! zo
189
normal! zo
202
normal! zo
207
normal! zo
215
normal! zo
203
normal! zo
211
normal! zo
219
normal! zo
203
normal! zo
211
normal! zo
219
normal! zo
let s:l = 221 - ((38 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
221
normal! 066|
lcd ~/work/projects/rpguild/src
tabedit ~/work/projects/rpguild/src/types/Quest.ts
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
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 2 - ((1 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 0
lcd ~/work/projects/rpguild/src
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
