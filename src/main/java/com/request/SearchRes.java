package main.java.com.request;

import java.io.FileReader;
import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.config.HttpClientConfig;
import io.searchbox.core.Search;
import io.searchbox.core.SearchResult;
import io.searchbox.params.Parameters;
import main.java.com.alert.EmailNotification;
import main.java.com.report.ReportGeneration;
import org.json.simple.parser.*;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.MessagingException;

/**
 * Created by ankur on 6/12/16.
 */
public class SearchRes {

    int totalHits = 0;
    //public static void main(String[] args) {
    public int SearchResult(String req) {


        JSONParser parser = new JSONParser();
        Object obj;
        System.out.println("Request in SearchResult=" +req);
        Logger LOG = LoggerFactory.getLogger(SearchRes.class);
        //String file = args[0];
        try{

            /*String url = "https://bb-blr-prod-elasticsearch.bankbazaar.com";
            InetAddress address = InetAddress.getByName(new URL(url).getHost());
            LOG.info("Host InetAddress : " + address);
            String ip = "http://"+address.getHostAddress()+":9200";
            LOG.info("Host IP : " + ip);*/

            obj = parser.parse(req);
            JSONObject jsonObject = (JSONObject) obj;
            String url = (String) jsonObject.get("url");
            JestClientFactory factory = new JestClientFactory();
            //factory.setHttpClientConfig(new HttpClientConfig.Builder("http://10.1.20.42:9200").readTimeout(30000).multiThreaded(true).build());
            factory.setHttpClientConfig(new HttpClientConfig.Builder(url).readTimeout(30000).multiThreaded(true).build());
            JestClient client = factory.getObject();
            SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

            String method = (String) jsonObject.get("method");

            if (method.equals("alert")){
                String index_name = (String) jsonObject.get("index");
                String type_name = (String) jsonObject.get("type");
                String greaterThan = (String) jsonObject.get("dateRangeGTE");
                String lessThan = (String) jsonObject.get("dateRangeLTE");
                String email_to = (String) jsonObject.get("email_to");
                String message_text = (String) jsonObject.get("message");
                String threshold = (String) jsonObject.get("threshold");
                String subject_line = (String) jsonObject.get("subject");
                LOG.info("Method type :" + method);

                if(message_text.equals("*")) {
                    searchSourceBuilder.query(QueryBuilders.boolQuery()
                            .must(QueryBuilders.rangeQuery("@timestamp").gte(greaterThan).lte(lessThan))
                            .must(QueryBuilders.matchAllQuery()));
                }else {
                    searchSourceBuilder.query(QueryBuilders.boolQuery()
                            .must(QueryBuilders.rangeQuery("@timestamp").gte(greaterThan).lte(lessThan))
                            .must(QueryBuilders.matchQuery("message", message_text)));
                }
                Search search;
                if (type_name.equals("*")) {
                    search = new Search.Builder(searchSourceBuilder.toString()).addIndex(index_name)
                            .setParameter(Parameters.SIZE, 10)
                            .build();
                } else {
                    search = new Search.Builder(searchSourceBuilder.toString()).addIndex(index_name).addType(type_name)
                            .setParameter(Parameters.SIZE, 10)
                            .build();
                }

                SearchResult result = client.execute(search);

                if (result.getTotal() > Integer.parseInt(threshold)){
                    System.out.println("Total hits: "+result.getTotal());
                    EmailNotification notif = new EmailNotification();
                    notif.emailNotif(email_to, subject_line);
                }
                client.shutdownClient();
            }
            else if(method.equals("report")){
                String index_name = (String) jsonObject.get("index");
                String type_name = (String) jsonObject.get("type");
                //String hostname = (String) jsonObject.get("hostname");
                String message_text = (String) jsonObject.get("message");
                String greaterThan = (String) jsonObject.get("dateRangeGTE");
                String lessThan = (String) jsonObject.get("dateRangeLTE");
                String filename = (String) jsonObject.get("filename");
                LOG.info("Method type :" + method);
                //Creating the search builder based on message and timestamp
                if(message_text.equals("*")) {
                    searchSourceBuilder.query(QueryBuilders.boolQuery()
                            .must(QueryBuilders.rangeQuery("@timestamp").gte(greaterThan).lte(lessThan))
                            .must(QueryBuilders.matchAllQuery()))
                            .fetchSource(new String[]{"message"}, null);
                }else {
                    searchSourceBuilder.query(QueryBuilders.boolQuery()
                            .must(QueryBuilders.rangeQuery("@timestamp").gte(greaterThan).lte(lessThan))
                            .must(QueryBuilders.matchQuery("message", message_text)))
                            .fetchSource(new String[]{"message"}, null);
                }
                //Query for index and type
                Search search;
                if (type_name.equals("*")) {
                    search = new Search.Builder(searchSourceBuilder.toString()).addIndex(index_name)
                            .setParameter(Parameters.SIZE, 10000)
                            .build();
                } else {
                    search = new Search.Builder(searchSourceBuilder.toString()).addIndex(index_name).addType(type_name)
                            .setParameter(Parameters.SIZE, 10000)
                            .build();
                }
                SearchResult result = client.execute(search);
                totalHits = result.getTotal();
                String source = result.getSourceAsString();
                String parsedStr = source.replaceAll("\\{\"", "\n\n");
                //System.out.println(parsedStr);

                ReportGeneration rep = new ReportGeneration();
                rep.reportGen(parsedStr, filename);

                client.shutdownClient();

            } else {
                LOG.info("Please enter a valid method type in the config file");
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }catch (NullPointerException e) {
            e.printStackTrace();
        }/*catch (MessagingException e) {
            e.printStackTrace();
        }catch (MalformedURLException e) {
            e.printStackTrace();
        }catch (UnknownHostException e) {
            e.printStackTrace();
        }*/
        return totalHits;
    }

}
