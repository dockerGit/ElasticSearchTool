package main.java.com.report;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by ankur on 14/12/16.
 */
public class ReportGeneration {

    public void reportGen(String value, String filename){
        Logger LOG = LoggerFactory.getLogger(ReportGeneration.class);
        try {
            LOG.info("Generating report for the search query.......");
            /*Date date = new Date(System.currentTimeMillis());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd-hh:mm:ss");
            String dateString =  simpleDateFormat.format(date);
            PrintWriter pw = new PrintWriter(new FileWriter("/home/ankur/Backup/"+filename+"_"+ dateString + ".csv"));*/
            PrintWriter pw = new PrintWriter(new FileWriter("/home/moolshankar/"+filename));
            StringBuilder sb = new StringBuilder();
            sb.append(value);
            pw.write(sb.toString());
            pw.close();
            LOG.info("Report generated.......");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }

    }
}
