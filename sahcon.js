const getUrlPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get("page")
  return p ? p : "home"
}

const loadPage = async () => {
  // Get page
  document.body.className = "loading"
  pageUrl = `./pages/${getUrlPage()}.html`
  if (/flaringk/.test(window.location.href)) { pageUrl = `./flaringk/pages/${getUrlPage()}.html` }
  pageHtml = await fetch(pageUrl).then(e => e.text())

  // "Load page"
  document.body.className = "transitioning"
  await new Promise(r => setTimeout(r, 250));
  document.body.className = getUrlPage()
  document.getElementById("content").innerHTML = pageHtml
  window.scrollTo(0, 0);

  // Init page
  document.querySelectorAll("#content .pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })
  highlightLink()
  openPhoneNav(false)
}

const clickLink = (event, link) => {
  console.log(link)
  event.preventDefault()
  history.pushState(null, '', link)
  loadPage()
}

const highlightLink = () => {
  document.querySelectorAll(".pageLink").forEach(a => {
    a.classList.remove("selected")

    if (a.href.includes(getUrlPage())) {
      a.classList.add("selected")
    }
  })
}

const openPhoneNav = open => {
  if (open) {
    document.getElementById("nav").classList.add("phoneOpen")
  } else {
    document.getElementById("nav").classList.remove("phoneOpen")
  }
}

document.querySelectorAll(".pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })

loadPage()