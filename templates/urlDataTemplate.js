const shortid = require("shortid");

module.export = class urlDataTemplate {
  constructor(url) {
    this.longUrl = url;
    this.shortUrl = shortid.generate();
    this.clickCount = 0;
    this.dateCreated = new Date();
  }
};
/**
                    <% allUrls.forEach(url=>{%>
                        <td><a href='<%= url.longUrl %>'>
                                <%=url.longUrl%>
                            </a> </td>

                        <td><a href='/<%=url.shortUrl%>'>
                                /<%=url.shortUrl%>
                            </a></td>
                        <td>
                            <%=url.clickCount%>
                        </td>

                        <% })%>
                        https://www.ynet.co.il/home/0,7340,L-8,00.html*/