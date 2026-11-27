const adventure = {
    original: {
        title: 'You recognize someone in a clip',
        context: 'You’re watching a TikTok clip of a teen throwing a drink at a worker and using a racial slur. She might play for the field hockey team at a nearby school. Someone in the comments says she goes to Falmouth High School, but you’re not sure.',
        handle: '@campus.clip', avatar: 'C', scene: 'private',
        image: 'portrait.jpg', imageAlt: 'Stock portrait',
        tag: 'ORIGINAL CLIP',
        headline: 'You think you recognize the person.',
        caption: 'A drive-through clip is making the rounds. #StoryTime',
        likes: 42,
        comments: [
            { from: '@jordanm', text: 'I think she goes to Falmouth High School.', identifying: true },
            { from: '@rileyb', text: 'Is anyone sure who this is?' }
        ],
        commentOptions: [
            { text: 'wait isn’t she on falmouth’s field hockey team?', rating: 'Risky comment', feedback: 'That adds identifying info based on a guess. It can help people track someone down instead of addressing what happened.' },
            { text: 'pretty sure that’s the girl from falmouth field hockey. someone needs to do something', rating: 'Risky comment', feedback: 'Being upset makes sense, but naming a school and team can fuel a pile-on. Keep identifying guesses out of public comments.' }
        ],
        paths: { send: 'teammate', likeComment: 'followup', repost: 'teammate', comment: 'notifications', scroll: 'end_scroll' }
    },
    followup: {
        title: 'A related video appears the next day',
        context: 'The next day, another video shows up. It asks people to help find the girl and says the worker got burned and needs medical care. You feel more pressure to do something.',
        handle: '@casey.l', avatar: 'C', scene: 'callout',
        image: 'cafe.jpg', imageAlt: 'Stock photo of a cafe interior',
        tag: 'THE NEXT DAY',
        headline: '“Can you help me find this girl?”',
        caption: 'The creator says their coworker was burned and needs medical treatment. They want help finding the girl.',
        likes: 3862,
        comments: [
            { from: '@casey.l', text: 'Someone needs to review the evidence.' },
            { from: '@jordanm', text: 'Does anyone recognize her?' }
        ],
        commentOptions: [
            { text: 'hold up she plays field hockey at falmouth right?', rating: 'Risky comment', feedback: 'What happened to the worker matters, but guessing who she is can put someone at risk. Keep evidence private and report it if needed.' },
            { text: 'someone got hurt?? i think she’s on falmouth’s team', rating: 'Risky comment', feedback: 'Wanting accountability is understandable. Posting a suspected school and team still helps people identify and target someone.' }
        ],
        paths: { screenrecord: 'end_evidence', comment: 'notifications', repost: 'teammate' }
    },
    notifications: {
        title: 'Your comment starts getting replies',
        context: 'Your comment gets 250 likes and a bunch of replies. People are posting her full name, TikTok page, field hockey articles, and address. Those details are hidden here, but the replies could still put her family at risk.',
        handle: '@campus.clip', avatar: 'C', scene: 'private',
        tag: 'YOUR COMMENT · 250 LIKES',
        headline: 'People are starting to share private details.',
        caption: 'Your comment is being used to connect identifying details.',
        likes: 250,
        comments: [
            { from: '@you', text: 'I think she’s on the Falmouth field hockey team.', own: true },
            { from: '@reply.one', text: 'Her full name is [name withheld]. Her profile is [account withheld].', identifying: true },
            { from: '@reply.two', text: 'Here are field hockey articles: [links withheld].', identifying: true },
            { from: '@reply.three', text: 'Her address is [private address withheld].', identifying: true }
        ],
        commentOptions: [
            { text: 'yo this is doxing. take her address down', rating: 'Helpful, but not enough on its own', feedback: 'Calling out the risk is good. A reply alone doesn’t take the information down, though. Report those comments too.' },
            { text: 'hold her accountable sure but leave her family out of it. delete the private info', rating: 'Helpful, but not enough on its own', feedback: 'That is the right boundary. The details are still visible, so reporting them is safer than replying alone.' }
        ],
        paths: { likeComment: 'end_like_details', reportComments: 'end_report_comments', deleteComment: 'end_delete_comment', reply: 'end_reply' }
    },
    teammate: {
        title: 'Your teammate posts a stitch',
        context: 'A teammate saw the video you shared and is furious. She posts a stitch that gives the girl’s full name and school, then makes fun of her field hockey skills and how she looks.',
        handle: '@samplays', avatar: 'T', scene: 'callout',
        image: 'phone.jpg', imageAlt: 'Stock photo of a smartphone',
        tag: 'YOUR TEAMMATE’S STITCH',
        headline: 'Accountability or a personal attack?',
        caption: 'A stitch names a person and school, then makes personal attacks.',
        likes: 987,
        comments: [
            { from: '@teammate1', text: 'This has turned into personal attacks.' },
            { from: '@hockeyfriend', text: 'We can deal with what happened without posting private details.' }
        ],
        paths: { repost: 'end_repost_stitch', scroll: 'end_ignore_stitch', messageTeammate: 'end_message_teammate', reportPost: 'end_report_stitch' }
    }
};

const endings = {
    end_scroll: { verdict: 'Good choice', title: 'You didn’t guess who it was.', detail: 'You weren’t sure, so you didn’t spread a name or send people looking for her. Dealing with what happened is better than guessing the person’s identity.' },
    end_evidence: { verdict: 'Good choice', title: 'You kept the evidence private.', detail: 'Recording the clip keeps a copy without posting someone’s personal details. Keep it private and show it only to a trusted adult or someone who can help.' },
    end_like_details: { verdict: 'Why this is harmful', title: 'Liking those comments still helps them spread.', detail: 'A like can push identifying comments higher in the feed. One name or link can help other people find even more personal details.' },
    end_report_comments: { verdict: 'Good choice', title: 'You reported the private details.', detail: 'You flagged the comments instead of boosting them. Reporting can help get them removed, but it may not work right away or replace urgent help.' },
    end_delete_comment: { verdict: 'Not enough on its own', title: 'Deleting your comment helps a little.', detail: 'Deleting it removes your comment, but copies and replies could still be out there. Report the comments sharing private details too.' },
    end_reply: { verdict: 'Not enough on its own', title: 'Calling it doxing doesn’t remove the details.', detail: 'Your reply can point out the problem, but the personal information is still visible. Report it instead of just adding more comments.' },
    end_repost_stitch: { verdict: 'Why this is harmful', title: 'You helped the stitch spread.', detail: 'Reposting sends the personal attacks and private details to more people. Being angry about what happened doesn’t make it okay to join in or pile on.' },
    end_ignore_stitch: { verdict: 'Why this is harmful', title: 'The stitch went too far.', detail: 'Leaving it alone lets it keep spreading. Report it or talk to your teammate privately instead.' },
    end_message_teammate: { verdict: 'Good choice', title: 'You talked to your teammate privately.', detail: 'You made the point that sharing someone’s identity and insulting them goes too far. Ask her to remove those parts and take the problem to the right person.' },
    end_report_stitch: { verdict: 'Good choice', title: 'You reported the stitch.', detail: 'You flagged the post even though the creator is a friend. It is possible to push for consequences without spreading someone’s personal details.' }
};

const actionNames = {
    send: 'Sent to Field Hockey group', likeComment: 'Liked identifying comment',
    likePost: 'Liked post', unlikePost: 'Removed like',
    savePost: 'Saved post', unsavePost: 'Removed saved post',
    repost: 'Reposted', comment: 'Posted comment', scroll: 'Kept scrolling',
    screenrecord: 'Saved screen recording', reportComments: 'Reported exposing comments',
    deleteComment: 'Deleted own comment', reply: 'Replied to comments',
    messageTeammate: 'Privately messaged teammate', reportPost: 'Reported stitch'
};

const actionHints = {
    original: {
        send: 'Send it to your field hockey group chat, saying “isn’t this the girl from field hockey?”',
        likeComment: 'Like the comment to show that you also think she goes to Falmouth.',
        repost: 'Repost the video in case your followers recognize her or know more.',
        comment: 'Add that she is on the school’s field hockey team because you want her held accountable.',
        scroll: 'You are not confident it is the girl you recognize, so you keep scrolling.'
    },
    followup: {
        screenrecord: 'Record the video to keep as evidence in case it is the girl you think it is.',
        comment: 'Now that you know someone was hurt, you want her found and held accountable. Comment that she is on the Falmouth field hockey team.',
        repost: 'Repost to show you disagree with what happened and hope a follower recognizes her so she can be held accountable.'
    },
    notifications: {
        likeComment: 'Like the replies you believe are true to boost the name and team information rather than more dangerous details like her address.',
        reportComments: 'Report the comments sharing private details instead of letting them stay online.',
        deleteComment: 'You did not mean for people to expose extra information that could put her family in danger. Delete your comment in the hope that its replies disappear too.',
        reply: 'Tell them they are doxing her and ask them to stop posting personal details.'
    },
    teammate: {
        repost: 'The stitch gets you fired up again, and you repost because you want the girl held responsible.',
        scroll: 'You think your teammate has it covered, so you keep scrolling.',
        messageTeammate: 'You think your teammate means well but may not realize how far the stitch went. Have a private conversation with her.',
        reportPost: 'Even though she is your friend, you do not think this video should be online, so you report it.'
    }
};

const feedTopics = [
    { image: 'coffee.jpg', imageAlt: 'Stock photo of cups of coffee', handle: '@coffee.break', headlines: ['A little coffee break', 'My afternoon coffee routine'], caption: 'A little coffee break. #DailyRoutine' },
    { image: 'cat.jpg', imageAlt: 'Stock photo of a cat resting on a ledge', handle: '@cat.corner', headlines: ['The cat found a new lookout', 'Someone is watching me again'], caption: 'A very busy day of doing nothing. #CatLife' },
    { image: 'forest.jpg', imageAlt: 'Stock photo of a sunlit forest trail', handle: '@weekend.walks', headlines: ['A quiet walk after class', 'Taking the scenic route home'], caption: 'Fresh air and a little time offline. #Outside' },
    { image: 'noodles.jpg', imageAlt: 'Stock photo of a noodle bowl', handle: '@quick.bites', headlines: ['An easy noodle bowl', 'What I made for lunch today'], caption: 'A simple lunch idea. #FoodTok' },
    { image: 'books.jpg', imageAlt: 'Stock photo of library bookshelves', handle: '@book.break', headlines: ['Looking for my next read', 'A quick trip to the library'], caption: 'Making time for a good book. #BookTok' },
    { image: 'art.jpg', imageAlt: 'Stock photo of paintbrushes and colorful paint', handle: '@little.sketches', headlines: ['A five-minute painting break', 'Trying out a new color palette'], caption: 'Just making something for fun. #ArtTok' }
];

const $ = (id) => document.getElementById(id);
const photoBase = new URL('.', $('postPhoto').src);
const sheet = $('actionSheet');
const body = $('sheetBody');
let current = 'original';
let states;
let trail;
let panelOpener;
let toastTimer;
let sessionVersion = 0;
let feedTimer;
let sequenceCard;
let scrolling = false;
let commentRatings;
let hintTarget;
let hintTimer;
let activeTimeline;

function reset() {
    sessionVersion += 1;
    clearTimeout(feedTimer);
    if (sequenceCard) sequenceCard.remove();
    scrolling = false;
    $('feedSequenceStatus').hidden = true;
    $('feedSequenceStatus').classList.remove('cb-sequence-intro', 'cb-sequence-notice');
    states = Object.fromEntries(Object.entries(adventure).map(([id, moment]) => [id, {
        liked: false, saved: false, reposted: false, reported: false, blocked: false,
        comments: moment.comments.map((comment) => ({ ...comment, liked: false, reported: false })),
        actions: [], messages: { Teammate: [], 'Trusted adult': [] }, drafts: []
    }]));
    trail = [];
    commentRatings = [];
    current = 'original';
    activeTimeline = undefined;
    if ($('finish').open) $('finish').close();
    delete $('finish').dataset.ending;
    $('appContent').hidden = false;
    $('progressStatus').textContent = '';
    showPost();
}

function state() {
    return states[current];
}

function displayedPost() {
    return adventure[current === 'notifications' ? state().source : current];
}

function setPostPhoto(image, post) {
    image.onerror = () => {
        console.error('Stock photo could not be loaded:', image.src);
        toast('A stock photo could not load. The controls are still available.');
    };
    image.alt = post.imageAlt;
    image.src = new URL(post.image, photoBase).href;
}

function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function button(text, action, className = 'cb-menu-item', hintAction) {
    const node = element('button', className, text);
    node.type = 'button';
    node.addEventListener('click', action);
    if (hintAction) node.dataset.actionHint = hintAction;
    return node;
}

function hideHint() {
    clearTimeout(hintTimer);
    $('actionTooltip').hidden = true;
    if (hintTarget) {
        const descriptions = (hintTarget.getAttribute('aria-describedby') || '').split(' ').filter((id) => id && id !== 'actionTooltip');
        if (descriptions.length) hintTarget.setAttribute('aria-describedby', descriptions.join(' '));
        else hintTarget.removeAttribute('aria-describedby');
    }
    hintTarget = undefined;
}

function showHint(target) {
    const text = actionHints[current][target.dataset.actionHint];
    if (!text || target.disabled || scrolling) return;
    hideHint();
    hintTarget = target;
    const tooltip = $('actionTooltip');
    tooltip.textContent = text;
    tooltip.hidden = false;
    const descriptions = target.getAttribute('aria-describedby');
    target.setAttribute('aria-describedby', descriptions ? `${descriptions} actionTooltip` : 'actionTooltip');
    const rect = target.getBoundingClientRect();
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    tooltip.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))}px`;
    const top = rect.bottom + height + 16 <= window.innerHeight ? rect.bottom + 8 : rect.top - height - 8;
    tooltip.style.top = `${Math.max(8, Math.min(top, window.innerHeight - height - 8))}px`;
}

function paragraph(text, className) {
    return element('p', className, text);
}

function toast(text) {
    clearTimeout(toastTimer);
    $('phoneStatus').textContent = text;
    $('phoneStatus').hidden = false;
    toastTimer = setTimeout(() => { $('phoneStatus').hidden = true; }, 4500);
}

function record(label, detail) {
    state().actions.push({ label, detail });
}

function recordPostAction(action) {
    trail.push({ scene: adventure[current].title, action, post: displayedPost().handle });
    renderTimeline();
}

function renderTimeline() {
    $('timelineEntries').replaceChildren();
    let activeEntry;
    let activeKey;
    function addScene(id, opening = false) {
        const scene = adventure[id];
        const entry = element('li', 'cb-timeline-entry cb-timeline-situation');
        entry.append(
            paragraph(opening ? 'WHERE YOU START' : 'WHAT HAPPENS NEXT', 'cb-kicker'),
            element(opening ? 'h1' : 'h3', '', scene.title),
            paragraph(scene.context)
        );
        if (opening) {
            entry.append(
                paragraph('Choose how you would respond in this TikTok-style feed.', 'cb-disclaimer'),
                paragraph('The stock photos are illustrative and unrelated to any incident.', 'cb-disclaimer')
            );
        }
        $('timelineEntries').append(entry);
        return entry;
    }
    let latestScene = addScene('original', true);
    trail.forEach((step, index) => {
        const entry = element('li', 'cb-timeline-entry');
        if (step.post) {
            entry.append(
                paragraph('YOUR ACTION', 'cb-timeline-scene'),
                element('h4', '', `${actionNames[step.action]}: ${step.post}`)
            );
            if (index === trail.length - 1) {
                activeEntry = entry;
                activeKey = `action:${index}`;
            }
            $('timelineEntries').append(entry);
            return;
        }
        entry.append(
            paragraph('YOUR CHOICE', 'cb-timeline-scene'),
            element('h4', '', actionNames[step.action])
        );
        const ending = endings[step.destination];
        if (ending) {
            const type = ending.verdict === 'Good choice' ? 'good'
                : ending.verdict === 'Why this is harmful' ? 'bad' : 'not-best';
            entry.dataset.outcome = type;
            const label = type === 'good' ? 'Why good' : type === 'bad' ? 'Why bad' : 'Why not best';
            const detail = step.destination === 'end_report_comments' ? states.notifications.reportDetail : ending.detail;
            entry.append(
                element('span', 'cb-timeline-label', label),
                paragraph(ending.title, 'cb-timeline-result'),
                paragraph(detail)
            );
            activeEntry = entry;
            activeKey = `ending:${step.destination}`;
        }
        $('timelineEntries').append(entry);
        if (!ending && (index < trail.length - 1 || step.destination === current)) {
            latestScene = addScene(step.destination);
        } else if (!ending) {
            entry.append(paragraph('Your feed continues…', 'cb-timeline-next'));
            activeEntry = entry;
            activeKey = `action:${index}`;
        }
    });
    const last = [...trail].reverse().find((step) => step.destination);
    if (!last || (!endings[last.destination] && last.destination === current)) {
        latestScene.append(element('h2', '', 'What do you do?'));
        if (!activeEntry) {
            activeEntry = latestScene;
            activeKey = `scene:${current}`;
        }
    }
    if (activeEntry) {
        activeEntry.setAttribute('aria-current', 'step');
        if (activeKey !== activeTimeline) activeEntry.classList.add('cb-timeline-enter');
        activeTimeline = activeKey;
    }
    const timeline = $('timelineEntries');
    const entries = [...timeline.children].reverse();
    timeline.style.counterReset = `story-step ${entries.length + 1}`;
    timeline.replaceChildren(...entries);
}

function showPost() {
    closePanel(false);
    clearTimeout(toastTimer);
    $('phoneStatus').hidden = true;
    const moment = adventure[current];
    const post = displayedPost();
    renderTimeline();
    $('feed').dataset.scene = post.scene;
    $('postTag').textContent = state().blocked ? 'CREATOR BLOCKED' : moment.tag;
    $('postHeadline').textContent = state().blocked ? 'You blocked this creator.' : post.headline;
    setPostPhoto($('postPhoto'), post);
    $('postPhoto').hidden = state().blocked;
    $('creatorButton').textContent = post.avatar;
    $('creatorHandle').textContent = post.handle;
    $('postCaption').textContent = state().blocked ? 'Open their profile to unblock. You can also move to the next post.' : post.caption;
    $('nextButton').disabled = !moment.paths.scroll;
    $('nextButton').hidden = !moment.paths.scroll;
    $('nextButton').setAttribute('aria-label', 'Keep scrolling');
    $('nextButton').dataset.actionHint = 'scroll';
    if (moment.paths.reply || moment.paths.comment) {
        $('commentsButton').dataset.actionHint = moment.paths.reply ? 'reply' : 'comment';
    } else {
        delete $('commentsButton').dataset.actionHint;
    }
    $('shareButton').dataset.actionHint = 'repost';
    updateCounts();
}

function updateCounts() {
    $('likeButton').setAttribute('aria-pressed', String(state().liked));
    $('bookmarkButton').setAttribute('aria-pressed', String(state().saved));
    $('shareButton').setAttribute('aria-pressed', String(state().reposted));
    $('likeCount').textContent = (displayedPost().likes + Number(state().liked)).toLocaleString();
    $('commentCount').textContent = String(state().comments.length);
}

function openPanel(title, opener = document.activeElement) {
    hideHint();
    if (sheet.hidden) panelOpener = $('appContent').contains(opener) ? opener : $('commentsButton');
    body.replaceChildren();
    $('sheetTitle').textContent = title;
    sheet.hidden = false;
    $('appContent').inert = true;
    $('sheetTitle').focus();
}

function closePanel(restoreFocus = true) {
    hideHint();
    sheet.hidden = true;
    $('appContent').inert = scrolling;
    if (restoreFocus && panelOpener && panelOpener.isConnected) panelOpener.focus();
}

function result(title, detail) {
    openPanel(title);
    const note = element('div', 'cb-result');
    note.append(element('h3', '', 'What happened'), paragraph(detail));
    body.append(note);
    body.append(button('Back to post', () => closePanel(), 'cb-button cb-primary'));
}

function storyActions() {
    openPanel('Story actions');
    const actions = {
        original: [
            ['Send it to the field hockey group', 'Ask your teammates if they recognize her.', shareMenu, 'send'],
            ['Like the school comment', 'Boost the comment identifying her school.', commentsPanel, 'likeComment'],
            ['Repost the video', 'Share the video with your followers.', shareMenu, 'repost'],
            ['Leave a comment', 'Add that you think she plays field hockey at the school.', commentsPanel, 'comment'],
            ['Keep scrolling', 'You are not sure it is her, so you move on.', nextPost, 'scroll']
        ],
        followup: [
            ['Screen record', 'Save the video as evidence.', postOptions, 'screenrecord'],
            ['Leave a comment', 'Share your suspicion about the field hockey team.', commentsPanel, 'comment'],
            ['Repost the video', 'Hope your followers recognize her or know more.', shareMenu, 'repost']
        ],
        notifications: [
            ['Like identifying replies', 'Like three replies you believe are correct.', commentsPanel, 'likeComment'],
            ['Report the exposing comments', 'Flag the replies sharing identifying information.', reportComments, 'reportComments'],
            ['Delete your comment', 'Remove your original comment and replies.', commentsPanel, 'deleteComment'],
            ['Reply to the comments', 'Tell the commenters to stop posting private details.', commentsPanel, 'reply']
        ],
        teammate: [
            ['Repost the stitch', 'Share your teammate’s video with your followers.', shareMenu, 'repost'],
            ['Keep scrolling', 'Assume your teammate has it covered.', nextPost, 'scroll'],
            ['Message your teammate', 'Discuss privately how far the stitch went.', () => messagePanel('Teammate'), 'messageTeammate'],
            ['Report the stitch', 'Ask the platform to review your teammate’s video.', reportMenu, 'reportPost']
        ]
    };
    body.append(paragraph('These are the actions in this part of the story. Tap one to find the corresponding phone control.', 'cb-small'));
    actions[current].forEach(([label, description, open, hint]) => {
        const row = element('div', 'cb-story-action');
        row.append(button(label, () => open(), 'cb-menu-item', hint), paragraph(description, 'cb-small'));
        body.append(row);
    });
}

function takePath(action) {
    const destination = adventure[current].paths[action];
    if (!destination) throw new Error(`No document path for ${current}: ${action}`);
    trail.push({ scene: adventure[current].title, action, destination });
    if (destination === 'notifications') {
        renderTimeline();
        states.notifications.source = current;
        states.notifications.liked = state().liked;
        states.notifications.saved = state().saved;
        states.notifications.blocked = state().blocked;
        playFeedSequence(destination, action);
    } else if (action === 'likeComment' && current === 'notifications') {
        showPhoneNotice('Comments liked', destination);
    } else if (action === 'likeComment' || action === 'repost') {
        playFeedSequence(destination, action);
    } else if (action === 'deleteComment') {
        showPhoneNotice('Comment was deleted', destination);
    } else completePath(destination);
}

function showPhoneNotice(message, destination) {
    scrolling = true;
    closePanel(false);
    clearTimeout(toastTimer);
    $('phoneStatus').hidden = true;
    const status = $('feedSequenceStatus');
    status.textContent = message;
    status.classList.add('cb-sequence-notice');
    status.hidden = false;
    feedTimer = setTimeout(() => {
        scrolling = false;
        status.hidden = true;
        status.classList.remove('cb-sequence-notice');
        completePath(destination);
    }, 2000);
}

function completePath(destination) {
    if (endings[destination]) {
        renderTimeline();
        finishSession(destination);
    } else {
        current = destination;
        showPost();
        toast(current === 'followup' ? 'The next day: a related video appears.' : 'Your teammate saw your share and posted a stitch.');
        $('commentsButton').focus();
    }
}

function playFeedSequence(destination, action) {
    scrolling = true;
    closePanel(false);
    clearTimeout(toastTimer);
    $('phoneStatus').hidden = true;
    const status = $('feedSequenceStatus');
    status.textContent = 'So you start scrolling..';
    status.classList.add('cb-sequence-intro');
    status.hidden = false;
    const topics = [...feedTopics];
    const posts = [];
    const count = action === 'likeComment' ? 6 : 3;
    for (let i = 0; i < count; i++) {
        posts.push(topics.splice(Math.floor(Math.random() * topics.length), 1)[0]);
    }
    let next = 0;
    function showNext() {
        if (sequenceCard) sequenceCard.remove();
        if (next === posts.length) {
            scrolling = false;
            status.hidden = true;
            if (destination === 'notifications') {
                current = destination;
                showPost();
                toast('The post is back. Your comment has 250 likes and new replies.');
                commentsPanel();
            } else {
                completePath(destination);
            }
            return;
        }
        const post = posts[next++];
        const headline = post.headlines[Math.floor(Math.random() * post.headlines.length)];
        sequenceCard = $('feed').cloneNode(true);
        sequenceCard.className = 'cb-feed cb-scroll-card';
        sequenceCard.inert = true;
        sequenceCard.setAttribute('aria-hidden', 'true');
        const photo = sequenceCard.querySelector('#postPhoto');
        setPostPhoto(photo, post);
        photo.hidden = false;
        sequenceCard.querySelector('.cb-fiction-label').textContent = 'STOCK PHOTO';
        sequenceCard.querySelector('#postTag').textContent = 'FOR YOU';
        sequenceCard.querySelector('#postHeadline').textContent = headline;
        sequenceCard.querySelector('#creatorHandle').textContent = post.handle;
        sequenceCard.querySelector('#creatorButton').textContent = post.handle[1].toUpperCase();
        sequenceCard.querySelector('#postCaption').textContent = post.caption;
        sequenceCard.querySelector('#likeCount').textContent = (100 + Math.floor(Math.random() * 4000)).toLocaleString();
        sequenceCard.querySelector('#commentCount').textContent = String(3 + Math.floor(Math.random() * 40));
        sequenceCard.querySelector('.cb-feed-progress').hidden = true;
        sequenceCard.querySelectorAll('[aria-pressed]').forEach((node) => node.setAttribute('aria-pressed', 'false'));
        sequenceCard.removeAttribute('id');
        sequenceCard.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
        $('feed').append(sequenceCard);
        const label = action === 'likeComment' ? 'Comment liked' : action === 'repost' ? 'Post reposted' : 'Comment posted';
        status.textContent = `${label}. Scrolling your feed… ${next} of ${posts.length}: ${headline}`;
        feedTimer = setTimeout(showNext, 1700);
    }
    feedTimer = setTimeout(() => {
        status.classList.remove('cb-sequence-intro');
        showNext();
    }, 5000);
}

function reportMenu() {
    openPanel('Report');
    if (current === 'notifications') {
        body.append(paragraph('The replies include private information. Report the exposing comments, not just the original video.'));
        body.append(button('Report exposing comments', reportComments, 'cb-menu-item', 'reportComments'));
        return;
    }
    body.append(paragraph('Why are you reporting this post?'));
    ['Sharing personal information', 'Bullying or harassment', 'Threats or safety concerns', 'Something else'].forEach((reason) => {
        body.append(button(reason, () => {
            state().reported = true;
            const detail = `Your report was sent: ${reason}. Reporting does not expose the person, but it might take time for the post to be removed.`;
            record(`Reported: ${reason}`, detail);
            if (adventure[current].paths.reportPost) takePath('reportPost');
            else result('Report submitted', detail);
        }, 'cb-menu-item', 'reportPost'));
    });
    body.append(paragraph('If someone is in immediate danger, contact a trusted adult or emergency services rather than waiting for a platform report.', 'cb-small'));
}

function shareMenu() {
    openPanel('Share to');
    body.append(paragraph('Choose where to send this post.'));
    body.append(
        button(state().reposted ? 'Remove repost' : 'Repost to your followers', () => {
            state().reposted = !state().reposted;
            updateCounts();
            const detail = state().reposted
                ? 'Your followers can now see this post. Reposting can amplify private information, accusations, and unwanted attention even when your intention is accountability.'
                : 'Your repost was removed. Removing a repost limits your own amplification, but does not erase copies other people may have made.';
            record(state().reposted ? 'Reposted to followers' : 'Removed repost', detail);
            if (state().reposted && adventure[current].paths.repost) takePath('repost');
            else result(state().reposted ? 'Reposted' : 'Repost removed', detail);
        }, 'cb-menu-item', 'repost'),
        button('Send to Field Hockey group', () => {
            const detail = 'The post was sent to the Field Hockey group with “Isn’t this the girl from field hockey?” Sharing an uncertain identification can encourage teammates to expose someone.';
            record('Forwarded to group', detail);
            if (adventure[current].paths.send) takePath('send');
            else result('Sent to Field Hockey group', detail);
        }, 'cb-menu-item', 'send'),
        button('Send privately to teammate', () => messagePanel('Teammate', true), 'cb-menu-item', 'messageTeammate'),
        button('Send privately to a trusted adult', () => messagePanel('Trusted adult', true)),
        button('Copy link', () => {
            const detail = 'A post link was saved in your phone’s activity history, not your computer clipboard. A link still directs others to the post; keep it private when seeking help.';
            record('Copied link', detail);
            result('Link copied', detail);
        }),
        button('Save private evidence', () => {
            state().saved = true;
            updateCounts();
            const detail = 'A note was saved to your phone profile. Keep identifying information out of public posts and show the evidence only to a trusted adult or moderator.';
            record('Saved private evidence', detail);
            result('Evidence saved privately', detail);
        })
    );
}

function compose(label, placeholder, suggestions, submitText, onSubmit) {
    const form = document.createElement('form');
    const fieldLabel = element('label', '', label);
    fieldLabel.htmlFor = 'composeText';
    const input = element('textarea');
    input.id = 'composeText';
    input.name = 'text';
    input.placeholder = placeholder;
    input.maxLength = 300;
    input.required = true;
    const error = paragraph('', 'cb-error');
    error.setAttribute('role', 'alert');
    const chips = element('div', 'cb-chip-row');
    suggestions.forEach((suggestion) => {
        chips.append(button(suggestion.label, () => {
            input.value = suggestion.text;
            input.focus();
        }, 'cb-chip'));
    });
    const send = element('button', 'cb-button cb-primary', submitText);
    send.type = 'submit';
    form.append(fieldLabel, input, chips, error, send);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) {
            error.textContent = 'Write a message before sending.';
            input.focus();
            return;
        }
        onSubmit(text);
    });
    body.append(form, paragraph('Text stays on this page and clears when you restart or reload.', 'cb-small'));
}

function commentsPanel(replyTo) {
    openPanel(`${state().comments.length} comments`);
    const canComment = Boolean(adventure[current].paths.comment || adventure[current].paths.reply);
    state().comments.forEach((comment) => {
        const row = element('div', 'cb-comment');
        const avatar = element('span', 'cb-comment-avatar', comment.from[1].toUpperCase());
        avatar.setAttribute('aria-hidden', 'true');
        const content = element('div', 'cb-comment-body');
        content.append(
            element('strong', '', comment.from),
            paragraph(comment.text)
        );
        if (canComment) {
            content.append(button('Reply', () => commentsPanel(comment.from), 'cb-reply', current === 'notifications' ? 'reply' : 'comment'));
        }
        if (comment.rating) {
            const judgment = element('div', 'cb-comment-judgment');
            judgment.append(element('strong', '', comment.rating), paragraph(comment.feedback));
            content.append(judgment);
        }
        if (comment.identifying) {
            const like = button(comment.liked ? '♥ Liked' : '♡ Like comment', () => {
                comment.liked = !comment.liked;
                record(comment.liked ? 'Liked identifying comment' : 'Removed comment like', comment.liked
                    ? 'You boosted a comment identifying the person.'
                    : 'You removed your like from this comment.');
                const likedCount = state().comments.filter((entry) => entry.identifying && entry.liked).length;
                if (adventure[current].paths.likeComment && (current !== 'notifications' || likedCount >= 3)) {
                    takePath('likeComment');
                } else {
                    commentsPanel(replyTo);
                    const index = state().comments.filter((entry) => entry.identifying).indexOf(comment);
                    body.querySelectorAll('.cb-comment-action[aria-pressed]')[index].focus();
                }
            }, 'cb-comment-action', 'likeComment');
            like.setAttribute('aria-label', 'Like identifying comment');
            like.setAttribute('aria-pressed', String(comment.liked));
            content.append(like);
            if (current === 'notifications') content.append(button('Report comment', reportComments, 'cb-comment-action', 'reportComments'));
        }
        if (comment.own && current === 'notifications') {
            content.append(button('Delete your comment', () => {
                state().comments = state().comments.filter((entry) => !entry.own && !entry.identifying);
                updateCounts();
                record('Deleted own comment', 'The reply thread was removed. Copies elsewhere may still exist.');
                takePath('deleteComment');
            }, 'cb-comment-action', 'deleteComment'));
        }
        row.append(avatar, content);
        body.append(row);
    });
    if (!canComment) {
        body.append(
            paragraph('Comments have been turned off on this post.', 'cb-small'),
            button('Story actions', storyActions, 'cb-button cb-primary')
        );
        return;
    }
    if (current === 'notifications' && !replyTo) {
        body.append(paragraph('To respond to the exposing replies, tap Reply under a comment.', 'cb-small'));
        return;
    }
    body.append(element('h3', '', replyTo ? `Reply to ${replyTo}` : 'Pick a comment'));
    body.append(paragraph('Choose a reply, then tap Post comment.', 'cb-small'));
    let selected;
    const presets = element('div', 'cb-preset-list');
    const send = button('Post comment', () => {
        const text = selected.text;
        state().comments.push({ from: '@you', text: replyTo ? `${replyTo} ${text}` : text, rating: selected.rating, feedback: selected.feedback });
        commentRatings.push({ scene: adventure[current].title, ...selected });
        updateCounts();
        record(`Public comment: ${selected.rating}`, selected.feedback);
        if (current === 'notifications') takePath('reply');
        else {
            Object.assign(states.notifications.comments.find((comment) => comment.own), {
                text, rating: selected.rating, feedback: selected.feedback
            });
            takePath('comment');
        }
    }, 'cb-button cb-primary', current === 'notifications' ? 'reply' : 'comment');
    send.disabled = true;
    adventure[current].commentOptions.forEach((choice) => {
        const preset = button(choice.text, () => {
            selected = choice;
            presets.querySelectorAll('button').forEach((node) => node.setAttribute('aria-pressed', 'false'));
            preset.setAttribute('aria-pressed', 'true');
            send.disabled = false;
            send.focus();
        }, 'cb-preset', current === 'notifications' ? 'reply' : 'comment');
        preset.setAttribute('aria-pressed', 'false');
        presets.append(preset);
    });
    body.append(presets, send);
}

function reportComments() {
    openPanel('Report comments');
    const exposing = state().comments.filter((comment) => comment.identifying);
    body.append(paragraph('Select the comments exposing information. Identifying details are shown as placeholders.'));
    const selected = new Set(exposing);
    exposing.forEach((comment) => {
        const label = element('label', 'cb-report-choice');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) selected.add(comment);
            else selected.delete(comment);
        });
        label.append(checkbox, element('span', '', comment.text));
        body.append(label);
    });
    const error = paragraph('', 'cb-error');
    error.setAttribute('role', 'alert');
    body.append(error, button('Submit comment reports', () => {
        if (!selected.size) {
            error.textContent = 'Select at least one comment to report.';
            return;
        }
        selected.forEach((comment) => { comment.reported = true; });
        const remaining = exposing.length - selected.size;
        state().reportDetail = remaining
            ? `You reported ${selected.size} of ${exposing.length} exposing comments. ${remaining} ${remaining === 1 ? 'comment was' : 'comments were'} not reported. Consider reporting the remaining private details too. Reports request a review but do not guarantee removal.`
            : 'You reported all of the comments sharing private details. The platform will review them, but there is no guarantee they will be removed.';
        record('Reported exposing comments', state().reportDetail);
        takePath('reportComments');
    }, 'cb-button cb-primary', 'reportComments'));
}

function contacts() {
    openPanel('Inbox');
    body.append(paragraph('Private conversations'));
    ['Teammate', 'Trusted adult'].forEach((name) => {
        body.append(button(`${name} · ${state().messages[name].length} sent`, () => messagePanel(name)));
    });
    body.append(paragraph('No messages are sent outside this page.', 'cb-small'));
}

function messagePanel(name, attached = false) {
    openPanel(name);
    body.append(paragraph(name === 'Teammate' ? 'Your field hockey teammate. Messages stay on this page.' : 'A trusted adult who can help with what happened.', 'cb-small'));
    state().messages[name].forEach((message) => {
        const bubble = element('div', 'cb-message');
        bubble.append(element('strong', '', 'You'), paragraph(message.text));
        if (message.attached) bubble.append(paragraph('Post attached', 'cb-small'));
        body.append(bubble);
    });
    if (attached) body.append(paragraph('Attachment: current post. Consider whether sending it will expose the recipient to more harm.', 'cb-result'));
    if (name === 'Teammate' && adventure[current].paths.messageTeammate) {
        body.append(element('h3', '', 'Choose a private message'));
        const messages = [
            'hey, i know you’re upset but sharing her info and coming for her looks isn’t okay. can you take that part down?',
            'i get why you want her held accountable, but this went too far. can we talk about taking the personal stuff out?'
        ];
        let selected;
        const choices = element('div', 'cb-preset-list');
        const send = button('Send message', () => {
            state().messages[name].push({ text: selected, attached });
            record('Messaged Teammate', 'You privately asked your teammate to reconsider the exposure and personal attacks.');
            takePath('messageTeammate');
        }, 'cb-button cb-primary', 'messageTeammate');
        send.disabled = true;
        messages.forEach((text) => {
            const choice = button(text, () => {
                selected = text;
                choices.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', 'false'));
                choice.setAttribute('aria-pressed', 'true');
                send.disabled = false;
                send.focus();
            }, 'cb-preset', 'messageTeammate');
            choice.setAttribute('aria-pressed', 'false');
            choices.append(choice);
        });
        body.append(choices, send);
        return;
    }
    compose('Private message', 'Write a message…', name === 'Teammate' ? [
        { label: 'Discuss the stitch', text: 'I know you want accountability, but the stitch exposes her identity and attacks her appearance. Could you remove those details and personal attacks?' },
        { label: 'Use private channels', text: 'Can we share the evidence privately with someone who can help instead of exposing her online?' }
    ] : [
        { label: 'Ask for help', text: 'Can you help review this incident privately? People are sharing identifying details and guessing who is involved.' }
    ], 'Send message', (text) => {
        state().messages[name].push({ text, attached });
        const detail = name === 'Teammate'
            ? 'Your private message was sent to your teammate. A private conversation can address how the stitch has gone too far without starting a public pile-on.'
            : 'Your message was sent to the trusted adult. Talking privately can help without starting a public pile-on.';
        record(`Messaged ${name}${attached ? ' with post attached' : ''}`, detail);
        messagePanel(name);
        body.prepend(paragraph('Message sent.', 'cb-result'));
    });
}

function createPost() {
    openPanel('Create post');
    body.append(paragraph('This will publish to your profile.'));
    compose('Post caption', 'Write a post…', [
        { label: 'General reminder', text: 'Don’t share private information. Support people without reposting their story.' },
        { label: 'Public call-out', text: '[A public call-out about an unverified account]' },
        { label: 'Share private details', text: '[A post containing private details]' }
    ], 'Publish post', (text) => {
        state().drafts.push(text);
        const detail = 'Your post was published to your profile. Public call-outs can escalate harm. Keep private information and unverified accusations out of public posts.';
        record('Published post', detail);
        result('Post published', detail);
    });
}

function creatorProfile() {
    openPanel('Creator profile');
    body.append(element('div', 'cb-profile-avatar', displayedPost().avatar), paragraph(displayedPost().handle, 'cb-profile-handle'));
    body.append(paragraph('Public profile. Identifying details are not shown here.', 'cb-small'));
    body.append(
        button('Message creator', () => {
            openPanel('Message creator');
            compose('Private message', 'Write a message…', [
                { label: 'Ask to remove details', text: 'Please remove the identifying details from this post. We can report what happened instead.' }
            ], 'Send message', (text) => {
                const detail = 'Your message to the creator was recorded locally. Direct confrontation may escalate a situation; you can report or block instead.';
                record('Messaged creator', `${detail} Message: ${text}`);
                result('Message sent', detail);
            });
        }),
        button('Look for identifying information', () => {
            const detail = 'This profile does not show private information. Looking for someone’s identity or personal accounts can turn into doxing. Focus on what happened and report the post.';
            record('Looked for identifying information', detail);
            result('Private information is not available', detail);
        }),
        button(state().blocked ? 'Unblock creator' : 'Block creator', () => {
            state().blocked = !state().blocked;
            record(state().blocked ? 'Blocked creator' : 'Unblocked creator', 'Blocking limits your contact with an account. It is not a report and does not remove the post for other people.');
            showPost();
            toast(state().blocked ? 'Creator blocked.' : 'Creator unblocked.');
        })
    );
}

function ownProfile() {
    openPanel('Your profile');
    body.append(element('div', 'cb-profile-avatar', 'Y'), paragraph('@you', 'cb-profile-handle'));
    body.append(paragraph(`${state().saved ? '1 saved post' : 'No saved posts'} · ${state().reposted ? '1 repost' : 'No reposts'} · ${state().drafts.length} published posts`));
    state().drafts.forEach((text) => body.append(paragraph(text, 'cb-message')));
    body.append(element('h3', '', 'Activity on this post'));
    if (!state().actions.length) body.append(paragraph('No activity yet.'));
    state().actions.forEach((action) => {
        const entry = element('div', 'cb-result');
        entry.append(element('h3', '', action.label), paragraph(action.detail));
        body.append(entry);
    });
    body.append(paragraph('Stock photos: Unsplash. Original portrait: Joseph Gonzalez.', 'cb-small'));
}

function postOptions() {
    openPanel('Post options');
    body.append(
        button('Report post', reportMenu, 'cb-menu-item', 'reportPost'),
        button('Screen record', () => {
            openPanel('Screen recording');
            const preview = $('postPhoto').cloneNode();
            preview.removeAttribute('id');
            preview.className = 'cb-record-preview';
            body.append(preview, paragraph('Recording the post. Your device camera and microphone are not used.'));
            body.append(button('Stop and save recording', () => {
                state().saved = true;
                updateCounts();
                record('Screen-recorded private evidence', 'A recording note of the post was saved privately in your profile; no actual device recording was made.');
                if (adventure[current].paths.screenrecord) takePath('screenrecord');
                else result('Recording saved', 'The evidence note is private. Saving evidence does not report a post or justify publishing identifying information.');
            }, 'cb-button cb-primary', 'screenrecord'));
        }, 'cb-menu-item', 'screenrecord'),
        button('Save private evidence', () => {
            state().saved = true;
            updateCounts();
            const detail = 'A private evidence note was saved to your profile. Share it only with someone you trust.';
            record('Saved private evidence', detail);
            result('Evidence saved', detail);
        }),
        button('View creator / block', creatorProfile)
    );
    if (adventure[current].paths.scroll) body.append(button('Keep scrolling', nextPost, 'cb-menu-item', 'scroll'));
    if (current === 'notifications') body.prepend(button('Report exposing comments', reportComments, 'cb-menu-item', 'reportComments'));
}

function nextPost() {
    if (scrolling) return;
    if (!adventure[current].paths.scroll) {
        toast('This scene follows your phone actions. Open comments, sharing, or post options to respond.');
        closePanel();
        return;
    }
    record('Kept scrolling', 'You chose not to engage with this post.');
    takePath('scroll');
}

function finishSession(endingId) {
    const ending = endings[endingId];
    closePanel(false);
    clearTimeout(toastTimer);
    $('finish').dataset.ending = endingId;
    $('finishVerdict').textContent = ending.verdict;
    $('finishTitle').textContent = ending.title;
    $('finishDetail').textContent = endingId === 'end_report_comments' ? state().reportDetail : ending.detail;
    $('actionSummary').replaceChildren();
    trail.forEach((step) => {
        $('actionSummary').append(element('li', '', `${step.scene}: ${actionNames[step.action]}.`));
    });
    $('commentSummary').replaceChildren();
    $('commentSummary').hidden = commentRatings.length === 0;
    if (commentRatings.length) {
        $('commentSummary').append(element('h3', '', 'Your comments'));
        commentRatings.forEach((choice) => {
            const judgment = element('div', 'cb-comment-judgment');
            judgment.append(
                paragraph(`“${choice.text}”`),
                element('strong', '', choice.rating),
                paragraph(choice.feedback)
            );
            $('commentSummary').append(judgment);
        });
    }
    $('finish').showModal();
    $('finish').scrollTop = 0;
    $('finishTitle').focus();
    const version = sessionVersion;
    saveProgress(courseId, 'phone_simulation').catch((error) => {
        console.error('Failed to save course progress:', error);
        if (version === sessionVersion) $('progressStatus').textContent = 'Progress could not be saved. Check your connection and try again.';
    });
}

$('likeButton').addEventListener('click', () => {
    state().liked = !state().liked;
    updateCounts();
    record(state().liked ? 'Liked post' : 'Removed like', 'A like can help a post spread. Make sure you are not boosting harmful or unverified claims.');
    recordPostAction(state().liked ? 'likePost' : 'unlikePost');
    toast(state().liked ? 'Liked. This can boost the post in a real feed.' : 'Like removed.');
});
$('bookmarkButton').addEventListener('click', () => {
    state().saved = !state().saved;
    updateCounts();
    record(state().saved ? 'Bookmarked post' : 'Removed bookmark', 'A bookmark keeps the post close, but it does not report it or save every version as evidence.');
    recordPostAction(state().saved ? 'savePost' : 'unsavePost');
    toast(state().saved ? 'Saved to your profile.' : 'Removed from saved posts.');
});
$('commentsButton').addEventListener('click', () => commentsPanel());
$('shareButton').addEventListener('click', shareMenu);
$('postMenu').addEventListener('click', postOptions);
$('choicesButton').addEventListener('click', storyActions);
$('creatorButton').addEventListener('click', creatorProfile);
$('nextButton').addEventListener('click', nextPost);
$('closeSheet').addEventListener('click', () => closePanel());
$('homeButton').addEventListener('click', () => showPost());
$('friendsButton').addEventListener('click', contacts);
$('inboxButton').addEventListener('click', contacts);
$('createButton').addEventListener('click', createPost);
$('profileButton').addEventListener('click', ownProfile);
$('restartButton').addEventListener('click', () => {
    reset();
    $('commentsButton').focus();
});
$('finish').addEventListener('cancel', (event) => event.preventDefault());

document.addEventListener('pointerover', (event) => {
    const target = event.target.closest('[data-action-hint]');
    if (target && !target.contains(event.relatedTarget)) showHint(target);
    if ($('actionTooltip').contains(event.target)) clearTimeout(hintTimer);
});
document.addEventListener('pointerout', (event) => {
    if (hintTarget && (hintTarget.contains(event.target) || $('actionTooltip').contains(event.target))) {
        if (!hintTarget.contains(event.relatedTarget) && !$('actionTooltip').contains(event.relatedTarget)) {
            hintTimer = setTimeout(hideHint, 150);
        }
    }
});
document.addEventListener('focusin', (event) => {
    const target = event.target.closest('[data-action-hint]');
    if (target) showHint(target);
});
document.addEventListener('focusout', hideHint);
document.addEventListener('pointerdown', hideHint);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideHint();
});
window.addEventListener('resize', hideHint);
document.addEventListener('scroll', hideHint, true);

function panelKeys(event, panel, title, close) {
    if (event.key === 'Escape') {
        close();
    } else if (event.key === 'Tab') {
        const targets = [...panel.querySelectorAll('button, textarea, input, a[href]')].filter((node) => !node.disabled);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === title)) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}
sheet.addEventListener('keydown', (event) => {
    panelKeys(event, sheet, $('sheetTitle'), closePanel);
});

let touchStart;
$('feed').addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1 && !event.target.closest('button') ? event.touches[0].clientY : undefined;
}, { passive: true });
$('feed').addEventListener('touchend', (event) => {
    if (touchStart === undefined) return;
    const distance = touchStart - event.changedTouches[0].clientY;
    touchStart = undefined;
    if (distance > 70) nextPost();
}, { passive: true });
reset();
