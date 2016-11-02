//Copyright (c) 2014 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.
'use strict';

var viewer;
var url;
var model;

function updateTimeline(url_req) {
    url = url_req
    var req = new XMLHttpRequest();
    //var is_binary = /[.]gz$/.test(url) || /[.]zip$/.test(url);
    //req.overrideMimeType('text/plain; charset=x-user-defined');
    req.overrideMimeType("application/json");
    req.open('GET', url, true);
    //if (is_binary)
    //    req.responseType = 'arraybuffer';

    req.onreadystatechange = function(event) {
        if (req.readyState !== 4)
            return;

        window.setTimeout(function() {
            if (req.status === 200)
                onResult(is_binary ? req.response : req.responseText);
            else
                onResultFail(req.status);
            }, 0);
    };
    req.send(null);
}

function onResultFail(err) {
    var overlay = new tr.ui.b.Overlay();
    overlay.textContent = err + ': ' + url + ' could not be loaded';
    overlay.title = 'Failed to fetch data';
    overlay.visible = true;
}

function onResult(result) {
    model = new tr.Model();
    var i = new tr.importer.Import(model);
    var p = i.importTracesWithProgressDialog([result]);
    p.then(onModelLoaded, onImportFail);
}

function onModelLoaded() {
    viewer.model = model;
    viewer.viewTitle = url;
}

function onImportFail() {
    var overlay = new tr.ui.b.Overlay();
    overlay.textContent = tr.b.normalizeException(err).message;
    overlay.title = 'Import error';
    overlay.visible = true;
}

function initTimeline(cont_id) {
    var container = document.createElement('track-view-container');
    container.id = 'track_view_container';
    viewer = document.createElement('tr-ui-timeline-view');
    viewer.track_view_container = container;
    Polymer.dom(viewer).appendChild(container);
    viewer.id = 'trace-viewer';
    viewer.globalMode = false;
    Polymer.dom(document.getElementById(cont_id)).appendChild(viewer);
}
