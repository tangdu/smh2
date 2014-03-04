package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Log;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-14
 * Time: 下午10:58
 * To change this template use File | Settings | File Templates.
 */
public interface LogRepository extends CustomerRepository<Log,String> {

    @Modifying
    @Query( "update Log u set u.leaveTime=:leaveTime where u.accessTime=:accessTime and u.accessUserid=:accessUserid")
    public int updateLogoutTime(@Param("leaveTime") Date leaveTime,@Param("accessTime") Date accessTime,@Param("accessUserid") String accessUserid);

   @Query("select max(accessTime) from Log where accessUserid=:accessUserid")
   public Date findMaxAccessTime(@Param("accessUserid")String accessUserid);
}
