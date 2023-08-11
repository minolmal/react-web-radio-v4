<p><a target="_blank" href="https://app.eraser.io/workspace/recpJ4063zf8cxSLcbh6" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

###  onMounted
- [x] loadSortOptions();
- [x] loadFavorites();
- [x] loadVolume();
- [x] setupEvents();
- [x] getChannels( true );
    - [x] soma.getChannels
    - [x] if(err) setError
    - [x] clearError
    - [x] updateCurrChannel
        - [x] isCurrentChannel
    - [x] applyRoute
        - [x] if(channel) true
            - [x] selectChannel
                - [x] isCurrentChannel
                - [x] closeAudio
                - [x] toggleSidebar(false)
                - [x] setRoute
                - [x] getSongs
                - [x] if(play)
                - [x] playChannel
            - [x] if(channel) false
                - [x] resetPlayer
                    - [x] closeAudio
                    - [x] flushErrors
                - [x] toggleSidebar
- [ ] setupCanvas();
- [ ] updateCanvas();
- [x] setupMaintenance();
    - [x] 30s Interval
        - [x] getChannels
        - [x] getSongs
- [ ] updateHeight();
    - [ ] setCssHeight
- [x] initPlayer();


### onUnmount
- [x] closeAudio();
- [x] clearTimers();





<!--- Eraser file: https://app.eraser.io/workspace/recpJ4063zf8cxSLcbh6 --->