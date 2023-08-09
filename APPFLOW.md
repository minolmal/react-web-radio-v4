<p><a target="_blank" href="https://app.eraser.io/workspace/recpJ4063zf8cxSLcbh6" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

###  onMounted
- [ ] loadSortOptions();
- [ ] loadFavorites();
- [ ] loadVolume();
- [ ] setupEvents();
- [ ] getChannels( true );
    - [ ] soma.getChannels
    - [ ] if(err) setError
    - [ ] clearError
    - [ ] updateCurrChannel
        - [ ] isCurrentChannel
    - [ ] applyRoute
        - [ ] if(channel) true
            - [ ] selectChannel
                - [ ] isCurrentChannel
                - [ ] closeAudio
                - [ ] toggleSidebar(false)
                - [ ] setRoute
                - [ ] getSongs
                - [ ] if(play)
                - [ ] playChannel
            - [ ] if(channel) false
                - [ ] resetPlayer
                    - [ ] closeAudio
                    - [ ] flushErrors
                - [ ] toggleSidebar
- [ ] setupCanvas();
- [ ] updateCanvas();
- [ ] setupMaintenance();
    - [ ] 30s Interval
        - [ ] getChannels
        - [ ] getSongs
- [ ] updateHeight();
    - [ ] setCssHeight
- [ ] initPlayer();


### onUnmount
- [ ] closeAudio();
- [ ] clearTimers();





<!--- Eraser file: https://app.eraser.io/workspace/recpJ4063zf8cxSLcbh6 --->