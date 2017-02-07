package main.resources;

/**
 * Created by moolshankar on 7/2/17.
 */
import main.java.com.request.SearchRes;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/search")
public class SearchResources {
    @POST
    @Path("/report")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(javax.ws.rs.core.MediaType.APPLICATION_JSON)
    public String generateReport(String screenData) {
        SearchRes searchRes = new SearchRes();
        int hits = searchRes.SearchResult(screenData);
        return "hits :"+new Integer(hits).toString();
    }
}
