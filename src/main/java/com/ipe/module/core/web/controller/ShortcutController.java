package com.ipe.module.core.web.controller;

import com.ipe.module.core.entity.Shortcut;
import com.ipe.module.core.service.ShortcutService;
import com.ipe.module.core.web.util.BodyWrapper;
import com.ipe.module.core.web.util.RestRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by tangdu on 14-2-25.
 */
@Controller
@RequestMapping("/shortcut")
public class ShortcutController extends AbstractController {
    private static final Logger LOG = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    private ShortcutService shortcutService;

    @RequestMapping(value = {"/list"})
    public
    @ResponseBody
    BodyWrapper list(Shortcut shortcut, RestRequest rest) {
        try {
            int startRow = rest.getStart();
            int endRow = rest.getLimit();
            Page<Shortcut> page = shortcutService.findAll(null, new PageRequest(startRow, endRow, rest.getSorts()));
            return success(page);
        } catch (Exception e) {
            LOG.error("query error", e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/edit"}, method = RequestMethod.POST)
    public
    @ResponseBody
    BodyWrapper edit(Shortcut shortcut, RestRequest rest) {
        try {
            shortcutService.save(shortcut);
            return success(shortcut);
        } catch (Exception e) {
            LOG.error("edit error", e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/add"}, method = RequestMethod.POST)
    public
    @ResponseBody
    BodyWrapper add(Shortcut shortcut, RestRequest rest) {
        try {
            shortcutService.save(shortcut);
            return success(shortcut);
        } catch (Exception e) {
            LOG.error("add error", e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/del"})
    public
    @ResponseBody
    BodyWrapper del(String[] ids, RestRequest rest) {
        try {
            shortcutService.delete(ids);
            return success();
        } catch (Exception e) {
            LOG.error("del error", e);
            return failure(e);
        }
    }
}
